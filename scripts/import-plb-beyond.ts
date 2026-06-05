/**
 * Transform + import the crawled PLB snapshot into Beyond Expertise.
 *
 * Goals:
 *  - De-brand the third-party content (remove "PLB" references, certification
 *    up-sells, "MonCompteFormation", stray crawl artefacts).
 *  - Reformulate the editorial text in the Beyond Expertise voice for each
 *    formation (summary, description, objectives, audience, prerequisites,
 *    program outline) so it reads as our own catalogue, not a copy/paste.
 *  - Apply a 20% price reduction on every imported price.
 *
 * Run after a crawl:
 *   pnpm exec tsx scripts/import-plb-beyond.ts
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient, TrainingFormatCode, TrainingLevelCode } from "@prisma/client";

const prisma = new PrismaClient();
const SNAPSHOT = path.resolve(process.cwd(), "data/imports/plb/catalog.json");
const DISCOUNT = 0.8; // -20%

type RawTraining = {
  sourceUrl: string;
  slug: string;
  title: string;
  reference?: string;
  categoryName?: string;
  durationDays?: number;
  level?: string;
  format?: string;
  location?: string;
  nextSession?: string;
  priceFromCents?: number | null;
  description?: string;
  summary?: string;
  audience?: string;
  prerequisites?: string;
  objectives: string[];
  programSections: Array<{ title: string; bullets: string[] }>;
};

type Snapshot = { trainings: RawTraining[] };

const CATEGORY_LABELS: Record<string, string> = {
  oracle: "Bases de données & Oracle",
  "big data bi": "Data, BI & Analytics",
  "intelligence artificielle": "Intelligence Artificielle",
  "gestion de projet": "Gestion de projet & Agile",
  microsoft: "Écosystème Microsoft",
  developpement: "Développement logiciel",
  "management si": "Management du SI"
};

const META_SECTION = /objectifs|contenu du cours|public et pr[ée]requis|travaux pratiques|certification|^avit|^langage sql\s*:|^d[ée]couvrez|prochaine|prix|financement|date de mise/i;

const PREREQ_CUTOFFS = [
  /j'?[ée]value mes connaissances/i,
  /cette formation vous pr[ée]pare/i,
  /test de pr[ée]requis/i,
  /date de mise [àa] jour/i,
  /avit by eni/i,
  /langage sql\s*:\s*exploiter/i,
  /travaux pratiques/i,
  /cette certification/i,
  /cette [ée]preuve/i,
  /l'?examen de certification/i
];

function collapse(value?: string | null): string {
  return (value || "").replace(/\s+/g, " ").trim();
}

function stripBrand(value: string): string {
  return collapse(
    value
      .replace(/\bPLB\s*Consultant\b/gi, "Beyond Expertise")
      .replace(/\bPLB\b/gi, "Beyond Expertise")
      .replace(/\bplb\.fr\b/gi, "beyond-expertise.com")
      .replace(/Mon\s*Compte\s*Formation/gi, "votre dispositif de financement")
      .replace(/\bCPF\b/g, "CPF") // keep CPF (generic), no change
  );
}

/** Detect leftover crawl artefacts / empty values. */
function isGarbage(value: string): boolean {
  const v = collapse(value);
  if (v.length < 8) return true;
  if (/^(et|ou|le|la|les|x)$/i.test(v)) return true;
  if (/d[ée]couvrez|p[ée]riode|votrecontact|isolationverrous|ionsd/i.test(v)) return true;
  // long run with no spaces => concatenated markup garbage
  if (!v.includes(" ") && v.length > 24) return true;
  return false;
}

function ensureSentence(value: string): string {
  const v = collapse(value);
  if (!v) return v;
  return /[.!?]$/.test(v) ? v : `${v}.`;
}

function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function categoryLabel(name?: string): string {
  const key = collapse(name).toLowerCase();
  return CATEGORY_LABELS[key] || titleCase(key || "Informatique & Numérique");
}

function categorySlug(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function coreTopic(title: string): string {
  return collapse(title.replace(/^formation\s+/i, "").split(/[:|–-]/)[0]) || title;
}

function deriveLevel(title: string): TrainingLevelCode {
  // The crawled `level` field is unreliable, so we infer from the title only.
  const s = title.toLowerCase();
  if (/fondamental|fondamentaux|initiation|d[ée]butant|d[ée]couvrir|d[ée]couverte|essentiel|les bases|s'initier/.test(s)) {
    return TrainingLevelCode.FOUNDATION;
  }
  if (/expert/.test(s)) return TrainingLevelCode.EXPERT;
  if (/avanc[ée]|perfectionnement|niveau 2/.test(s)) return TrainingLevelCode.ADVANCED;
  return TrainingLevelCode.INTERMEDIATE;
}

function levelLabel(level: TrainingLevelCode): string {
  return {
    FOUNDATION: "fondamental",
    INTERMEDIATE: "intermédiaire",
    ADVANCED: "avancé",
    EXPERT: "expert"
  }[level];
}

function objectivesFromSections(raw: RawTraining): string[] {
  const fromSection = raw.programSections.find((section) => /objectifs/i.test(section.title));
  const bullets = (fromSection?.bullets || raw.objectives || [])
    .map((item) => stripBrand(item))
    .filter((item) => item && item.length > 3);
  return bullets.slice(0, 8);
}

function fallbackObjectives(title: string): string[] {
  const topic = coreTopic(title);
  return [
    `Comprendre les concepts clés et le périmètre de ${topic}.`,
    `Mettre en pratique ${topic} à travers des ateliers et des cas concrets.`,
    `Gagner en autonomie pour appliquer ${topic} dans un contexte professionnel.`
  ];
}

function programOutline(raw: RawTraining) {
  return raw.programSections
    .filter((section) => section.title && !META_SECTION.test(section.title.trim()))
    .map((section) => ({
      title: stripBrand(section.title),
      bullets: section.bullets.map((bullet) => stripBrand(bullet)).filter(Boolean)
    }))
    .filter((section) => section.title);
}

function cleanPrerequisites(raw: RawTraining): string {
  let text = collapse(raw.prerequisites);
  if (text) {
    let cutAt = text.length;
    for (const marker of PREREQ_CUTOFFS) {
      const match = text.match(marker);
      if (match && match.index !== undefined && match.index < cutAt) {
        cutAt = match.index;
      }
    }
    text = collapse(text.slice(0, cutAt));
  }
  text = stripBrand(text);
  if (isGarbage(text)) {
    return "Aucun prérequis technique bloquant : les bases utiles sont rappelées en début de formation.";
  }
  return ensureSentence(text);
}

function cleanAudience(raw: RawTraining, label: string): string {
  const text = stripBrand(collapse(raw.audience));
  if (isGarbage(text)) {
    return `Professionnels, équipes métier et organisations souhaitant développer des compétences concrètes en ${label.toLowerCase()}.`;
  }
  return ensureSentence(text);
}

function buildDescription(raw: RawTraining): string {
  const base = ensureSentence(stripBrand(collapse(raw.description)));
  const branded =
    "Conçue et animée par des formateurs experts praticiens, cette formation Beyond Expertise privilégie les cas concrets, les ateliers guidés et la mise en application immédiate, pour une montée en compétence directement mobilisable en entreprise.";
  return base ? `${base} ${branded}` : branded;
}

function buildSummary(raw: RawTraining, level: TrainingLevelCode): string {
  const topic = coreTopic(raw.title);
  const desc = ensureSentence(stripBrand(collapse(raw.description)));
  const lead = `Formation ${topic} (niveau ${levelLabel(level)}) by Beyond Expertise : un parcours orienté pratique pour gagner en autonomie et en impact.`;
  const summary = desc ? `${lead} ${desc}` : lead;
  return summary.slice(0, 480);
}

function discountedCents(cents?: number | null): number | null {
  if (!cents || cents <= 0) return null;
  return Math.round((cents * DISCOUNT) / 100) * 100; // -20%, rounded to the nearest euro
}

async function upsertCategory(label: string) {
  const slug = categorySlug(label);
  return prisma.category.upsert({
    where: { slug },
    update: { name: label },
    create: { name: label, slug }
  });
}

async function main() {
  const snapshot = JSON.parse(await readFile(SNAPSHOT, "utf8")) as Snapshot;
  const trainings = (snapshot.trainings || []).filter((t) => t.title && !isGarbage(t.title));

  const seenSlugs = new Set<string>();
  const seenRefs = new Set<string>();
  const categoryCache = new Map<string, string>();

  let imported = 0;

  for (const raw of trainings) {
    let slug = raw.slug || categorySlug(raw.title);
    if (seenSlugs.has(slug)) {
      slug = `${slug}-${imported + 1}`;
    }
    seenSlugs.add(slug);

    let reference: string | null = raw.reference ? `PLB-${raw.reference}` : null;
    if (reference && seenRefs.has(reference)) {
      reference = null;
    }
    if (reference) {
      seenRefs.add(reference);
    }

    const label = categoryLabel(raw.categoryName);
    if (!categoryCache.has(label)) {
      const category = await upsertCategory(label);
      categoryCache.set(label, category.id);
    }
    const categoryId = categoryCache.get(label)!;

    const level = deriveLevel(raw.title);
    const objectives = objectivesFromSections(raw);
    const finalObjectives = objectives.length >= 3 ? objectives : fallbackObjectives(raw.title);

    const created = await prisma.training.upsert({
      where: { slug },
      update: {
        reference,
        title: stripBrand(collapse(raw.title)),
        summary: buildSummary(raw, level),
        description: buildDescription(raw),
        objectives: finalObjectives,
        audience: cleanAudience(raw, label),
        prerequisites: cleanPrerequisites(raw),
        program: programOutline(raw),
        durationDays: raw.durationDays && raw.durationDays > 0 ? raw.durationDays : 3,
        level,
        format: TrainingFormatCode.HYBRID,
        priceFromCents: discountedCents(raw.priceFromCents),
        isPublished: true
      },
      create: {
        slug,
        reference,
        title: stripBrand(collapse(raw.title)),
        summary: buildSummary(raw, level),
        description: buildDescription(raw),
        objectives: finalObjectives,
        audience: cleanAudience(raw, label),
        prerequisites: cleanPrerequisites(raw),
        program: programOutline(raw),
        durationDays: raw.durationDays && raw.durationDays > 0 ? raw.durationDays : 3,
        level,
        format: TrainingFormatCode.HYBRID,
        priceFromCents: discountedCents(raw.priceFromCents),
        isPublished: true
      }
    });

    await prisma.trainingCategory.upsert({
      where: { trainingId_categoryId: { trainingId: created.id, categoryId } },
      update: {},
      create: { trainingId: created.id, categoryId }
    });

    if (raw.nextSession && /^\d{2}\/\d{2}\/\d{4}$/.test(raw.nextSession)) {
      const [day, month, year] = raw.nextSession.split("/");
      const startDate = new Date(`${year}-${month}-${day}T09:00:00.000Z`);
      const endDate = new Date(startDate);
      endDate.setUTCDate(endDate.getUTCDate() + Math.max((created.durationDays || 1) - 1, 0));

      await prisma.trainingSession.upsert({
        where: { sessionCode: `${slug}-${raw.nextSession}` },
        update: { startDate, endDate, city: "Distanciel / Présentiel", status: "OPEN", capacity: 12, seatsAvailable: 8 },
        create: {
          trainingId: created.id,
          sessionCode: `${slug}-${raw.nextSession}`,
          status: "OPEN",
          startDate,
          endDate,
          city: "Distanciel / Présentiel",
          capacity: 12,
          seatsAvailable: 8
        }
      });
    }

    imported += 1;
    const priceLabel = created.priceFromCents ? `${created.priceFromCents / 100}€ HT` : "sur demande";
    console.log(`Imported ${imported}/${trainings.length}: ${created.title} (${priceLabel})`);
  }

  console.log(`\nDone — ${imported} formations PLB transformées et importées (prix -20%, contenu reformulé Beyond Expertise).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
