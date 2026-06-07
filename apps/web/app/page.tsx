import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Check,
  Clock,
  Database,
  GraduationCap,
  Kanban,
  type LucideIcon,
  MapPinned,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Zap
} from "lucide-react";
import { FAQ } from "@/components/faq";
import { TrainingCard } from "@/components/training-card";
import { ClientLogo } from "@/components/client-logo";
import { faqItems } from "@/lib/data";
import { getHomepageFeaturedTrainings, getTrainings, groupTrainingsByPremiumCategory } from "@/lib/api";

const categoryIcons: Record<string, LucideIcon> = {
  "data-bi": BarChart3,
  "data-science-ml": Database,
  "ai-genai": Bot,
  "project-agile-pmo": Kanban,
  "business-analysis-product": Sparkles
};

const resourceHighlights = [
  {
    slug: "copilot",
    icon: Bot,
    tag: "IA & productivité",
    title: "Copilot en entreprise : cadrer les cas d'usage qui apportent vite de la valeur",
    excerpt: "Une lecture orientée directions, PMO et fonctions support pour identifier les gains réalistes et les garde-fous utiles."
  },
  {
    slug: "ai-security",
    icon: ShieldCheck,
    tag: "Gouvernance & sécurité",
    title: "IA et gouvernance : comment accélérer sans ouvrir de nouveaux risques",
    excerpt: "Une synthèse pour aligner innovation, conformité, sécurité et usages métier dans un même cadre de décision."
  },
  {
    slug: "lakehouse",
    icon: Database,
    tag: "Architecture data",
    title: "Lakehouse, BI, IA : quels choix d'architecture pour une plateforme data moderne",
    excerpt: "Une ressource pour clarifier les arbitrages entre reporting, data engineering, IA et industrialisation des pipelines."
  }
];

const advantageTabs = [
  {
    label: "Formateurs",
    title: "Des formateurs experts et praticiens",
    description:
      "Nos parcours sont portés par des intervenants capables de relier théorie, cas concrets et contraintes d'exécution en entreprise.",
    bullets: [
      "Double expertise métier et pédagogique",
      "Animation inter, intra et dispositifs sur-mesure",
      "Approche orientée applicabilité immédiate"
    ]
  },
  {
    label: "Certifications",
    title: "Des parcours structurés avec niveaux, prérequis et validation",
    description:
      "Le catalogue est pensé pour aider chaque profil à choisir le bon niveau, la bonne modalité et un dispositif cohérent pour monter en compétence.",
    bullets: [
      "Fiches formation détaillées et lisibles",
      "Positionnement par niveau et objectifs",
      "Possibilité d'évaluation et de certification"
    ]
  },
  {
    label: "Entreprise",
    title: "Une logique de portail client et de parcours entreprise",
    description:
      "Au-delà du catalogue, Beyond Expertise permet de cadrer les demandes, suivre les devis, organiser les inscriptions et séparer les usages client du LMS.",
    bullets: [
      "Tunnel commercial clair et rapide",
      "Suivi des demandes et validations",
      "Projection vers académie et portail B2B"
    ]
  }
];

const clientLogos = [
  { name: "BNP Paribas", domain: "bnpparibas.com" },
  { name: "Orange", domain: "orange.com" },
  { name: "Renault", domain: "renault.com" },
  { name: "Alten", domain: "alten.com" },
  { name: "IBM", domain: "ibm.com" },
  { name: "Société Générale", domain: "societegenerale.com" },
  { name: "Capgemini", domain: "capgemini.com" },
  { name: "Thales", domain: "thalesgroup.com" }
];

export default async function HomePage() {
  const trainings = await getTrainings();
  const featuredTrainings = getHomepageFeaturedTrainings(trainings);
  const premiumGroups = groupTrainingsByPremiumCategory(trainings).slice(0, 4);

  const formatCount = new Set(trainings.map((training) => training.format)).size;
  const categoryCount = new Set(trainings.map((training) => training.category)).size;
  const upcomingCount = trainings.filter((training) => training.nextSession !== "Planification à venir").length;
  const heroFeatured = featuredTrainings[0];
  const heroChips = ["Power BI", "Intelligence Artificielle", "Scrum", "SQL", "Copilot", "PMO"];

  return (
    <main className="home-page-main">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="section section-tight">
        <div className="page-shell">
          <div className="bx-hero">
            <div className="bx-hero-aurora" aria-hidden="true" />
            <div className="bx-hero-copy">
              <span className="bx-eyebrow">
                <ShieldCheck size={14} strokeWidth={2} /> Organisme de formation · Certifié Qualiopi
              </span>
              <h1 className="bx-hero-title">
                La formation qui fait <span>progresser</span> vos équipes et vos priorités métier.
              </h1>
              <p className="bx-hero-sub">
                Data, BI, IA, gestion de projet, agile et business analysis : un catalogue premium
                structuré pour aller vite du besoin à la bonne formation — en inter, intra ou parcours entreprise.
              </p>

              <form action="/formations" className="bx-hero-search" role="search">
                <Search size={20} strokeWidth={1.75} className="bx-hero-search-icon" />
                <input
                  name="q"
                  className="bx-hero-search-input"
                  placeholder="Rechercher : Power BI, IA, Scrum, SQL, PMO…"
                  aria-label="Rechercher une formation"
                />
                <button type="submit" className="bx-btn bx-btn-primary bx-hero-search-submit">
                  <span>Rechercher</span>
                  <span className="bx-btn-ico"><ArrowRight size={16} strokeWidth={2} /></span>
                </button>
              </form>

              <div className="bx-hero-chips">
                {heroChips.map((chip) => (
                  <Link key={chip} href={{ pathname: "/formations", query: { q: chip } }} className="bx-chip">
                    {chip}
                  </Link>
                ))}
              </div>

              <div className="bx-hero-trust">
                <div className="bx-hero-trust-rating">
                  <div className="bx-hero-stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <Star key={index} size={15} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <strong>4,8/5</strong>
                  <span>satisfaction</span>
                </div>
                <span className="bx-hero-trust-dot" aria-hidden="true" />
                <div className="bx-hero-trust-item">
                  <Award size={16} strokeWidth={1.75} /> CPF &amp; OPCO
                </div>
                <span className="bx-hero-trust-dot" aria-hidden="true" />
                <div className="bx-hero-trust-item">
                  <strong>+8 000</strong> apprenants/an
                </div>
              </div>
            </div>

            <aside className="bx-hero-panel">
              {heroFeatured ? (
                <article className="bx-hero-course">
                  <div className="bx-hero-course-top">
                    <span className="bx-tag">{heroFeatured.category}</span>
                    <span className="bx-hero-course-rating">
                      <Star size={13} fill="currentColor" strokeWidth={0} /> 4,9
                    </span>
                  </div>
                  <h3 className="bx-hero-course-title">{heroFeatured.title}</h3>
                  <div className="bx-hero-course-meta">
                    <span><Clock size={14} strokeWidth={1.75} /> {heroFeatured.duration}</span>
                    <span><GraduationCap size={14} strokeWidth={1.75} /> {heroFeatured.level}</span>
                    <span><MapPinned size={14} strokeWidth={1.75} /> {heroFeatured.format}</span>
                  </div>
                  <div className="bx-hero-course-foot">
                    <div className="bx-hero-course-price">
                      <span>À partir de</span>
                      <strong>{heroFeatured.priceFrom}</strong>
                    </div>
                    <Link href={`/formations/${heroFeatured.slug}`} className="bx-btn bx-btn-light">
                      <span>Voir</span>
                      <span className="bx-btn-ico"><ArrowRight size={16} strokeWidth={2} /></span>
                    </Link>
                  </div>
                </article>
              ) : null}

              <div className="bx-hero-kpis">
                <div className="bx-hero-kpi">
                  <strong>{trainings.length}</strong>
                  <span>formations actives</span>
                </div>
                <div className="bx-hero-kpi">
                  <strong>{upcomingCount}</strong>
                  <span>sessions planifiées</span>
                </div>
              </div>

              <Link href="/formations" className="bx-hero-panel-cta">
                <span>Explorer tout le catalogue</span>
                <span className="bx-btn-ico"><ArrowRight size={16} strokeWidth={2} /></span>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ──────────────────────────────────── */}
      <section className="section-tight" style={{ paddingTop: 0, paddingBottom: 10 }}>
        <div className="page-shell">
          <div className="home-trust-strip">
            <div className="home-trust-item">
              <div className="home-trust-icon home-trust-icon-accent">
                <Star size={20} fill="currentColor" />
              </div>
              <div className="home-trust-label">
                <span className="home-trust-value">4,8 / 5</span>
                <span className="home-trust-desc">Satisfaction apprenants</span>
              </div>
            </div>
            <div className="home-trust-item">
              <div className="home-trust-icon">
                <ShieldCheck size={20} />
              </div>
              <div className="home-trust-label">
                <span className="home-trust-value">Qualiopi</span>
                <span className="home-trust-desc">Certification qualité</span>
              </div>
            </div>
            <div className="home-trust-item">
              <div className="home-trust-icon">
                <Award size={20} />
              </div>
              <div className="home-trust-label">
                <span className="home-trust-value">CPF & OPCO</span>
                <span className="home-trust-desc">Financement éligible</span>
              </div>
            </div>
            <div className="home-trust-item">
              <div className="home-trust-icon">
                <ThumbsUp size={20} />
              </div>
              <div className="home-trust-label">
                <span className="home-trust-value">94 %</span>
                <span className="home-trust-desc">Taux de réussite</span>
              </div>
            </div>
            <div className="home-trust-item">
              <div className="home-trust-icon home-trust-icon-accent">
                <Zap size={20} />
              </div>
              <div className="home-trust-label">
                <span className="home-trust-value">+8 000</span>
                <span className="home-trust-desc">Apprenants formés / an</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Trainings ───────────────────────────── */}
      <section className="section section-tight-top" style={{ paddingTop: 10 }}>
        <div className="page-shell">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Formations les plus demandées</span>
              <h2 className="section-title section-title-wide">Une sélection immédiate pour les sujets les plus porteurs du catalogue.</h2>
            </div>
            <div className="section-cta-inline">
              <p className="section-copy section-copy-narrow">
                SQL, Power BI, PMO, Scrum, Copilot, AI Agents et data : les parcours les plus visibles pour les demandes inter et entreprise.
              </p>
              <Link href="/formations" className="button button-secondary">
                Découvrir tout le catalogue
              </Link>
            </div>
          </div>

          <div className="cards-grid">
            {featuredTrainings.map((training) => (
              <TrainingCard key={training.id} training={training} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Panel ──────────────────────────────────── */}
      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="home-stats-panel">
            <div className="home-stats-grid">
              <article className="home-stat-card">
                <strong>{trainings.length}</strong>
                <h3>formations au catalogue</h3>
                <p>Un socle structuré autour des usages data, IA, pilotage, agile et business analysis.</p>
              </article>
              <article className="home-stat-card">
                <strong>{premiumGroups.length}</strong>
                <h3>univers métier prioritaires</h3>
                <p>Des catégories premium pour accélérer l'orientation des directions, PMO, analysts et équipes data.</p>
              </article>
              <article className="home-stat-card">
                <strong>{formatCount}</strong>
                <h3>modalités de suivi</h3>
                <p>Présentiel, distanciel, hybride et e-learning selon le contexte de déploiement.</p>
              </article>
              <article className="home-stat-card">
                <strong>{categoryCount}</strong>
                <h3>domaines et sous-domaines</h3>
                <p>Un catalogue pensé pour couvrir la montée en compétence de plusieurs fonctions et niveaux.</p>
              </article>
            </div>

            <div className="home-stats-copy">
              <span className="eyebrow eyebrow-dark">Chiffres clés</span>
              <h2 className="section-title">Une base de catalogue sérieuse pour cadrer vite un projet de formation.</h2>
              <p className="section-copy">
                Beyond Expertise combine catalogue, tunnel commercial, espace client et projection LMS dans une architecture claire,
                avec de vraies fiches formation, des parcours prioritaires et une logique de portail entreprise.
              </p>
              <Link href="/a-propos" className="button button-secondary">
                En savoir plus sur Beyond Expertise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Client Logos ─────────────────────────────────── */}
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="page-shell">
          <div className="home-logos-band">
            <div className="home-logos-head">
              <p className="home-logos-title">Ils nous font confiance</p>
              <Link href="/a-propos" className="button button-secondary" style={{ fontSize: "0.82rem", padding: "8px 14px" }}>
                Voir nos références
              </Link>
            </div>
            <div className="home-logos-marquee">
              <div className="home-logos-track">
                {[...clientLogos, ...clientLogos].map((logo, index) => (
                  <ClientLogo
                    key={`${logo.name}-${index}`}
                    name={logo.name}
                    domain={logo.domain}
                    decorative={index >= clientLogos.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Advantages ───────────────────────────────────── */}
      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="home-advantages-panel">
            <div className="home-advantages-head">
              <div>
                <span className="eyebrow eyebrow-dark">Nos atouts</span>
                <h2 className="section-title home-advantages-title">
                  Les fondamentaux d&apos;un organisme de formation premium, lisible et moderne.
                </h2>
              </div>
              <div className="home-advantages-head-aside">
                <p className="section-copy">
                  Le site n&apos;expose pas seulement un catalogue : il structure une offre pédagogique,
                  commerciale et LMS capable de monter en maturité au fil du temps.
                </p>
                <Link href="/methodologie" className="button button-secondary">
                  Découvrir notre méthodologie <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </div>

            <div className="home-advantages-grid">
              {advantageTabs.map((tab) => (
                <article key={tab.label} className="home-advantage-card">
                  <span className="premium-category-accent">{tab.label}</span>
                  <h3>{tab.title}</h3>
                  <p>{tab.description}</p>
                  <ul className="home-advantage-list">
                    {tab.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Premium Categories ───────────────────────────── */}
      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Univers métier</span>
              <h2 className="section-title section-title-wide">Des catégories premium pour orienter rapidement chaque équipe vers le bon parcours.</h2>
            </div>
            <p className="section-copy section-copy-narrow">
              Chaque univers regroupe les formations les plus utiles pour un métier, un niveau et un objectif de transformation.
            </p>
          </div>

          <div className="feature-grid feature-grid-tight" style={{ marginTop: 24 }}>
            {premiumGroups.map((group) => {
              const Icon = categoryIcons[group.key] ?? Sparkles;
              return (
                <Link
                  key={group.key}
                  href={{ pathname: "/formations", hash: group.key }}
                  className="card premium-category-card"
                  style={{ gridColumn: "span 3", padding: 24 }}
                >
                  <div className="bx-cat-ico">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <span className="premium-category-accent">{group.accent}</span>
                  <h3 style={{ marginBottom: 10 }}>{group.title}</h3>
                  <p className="section-copy" style={{ margin: 0 }}>{group.description}</p>
                  <p className="premium-category-audience">{group.audience}</p>
                  <p className="premium-category-count">
                    {group.trainings.length} formations associées
                    <ArrowRight size={15} strokeWidth={2} />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────────────── */}
      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="home-interest-band">
            <div className="home-interest-copy">
              <span className="eyebrow" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>Projet entreprise</span>
              <h2 className="section-title" style={{ color: "white", maxWidth: "20ch" }}>
                Un même socle pour le catalogue, le devis, l'inscription, l'espace client et les espaces LMS.
              </h2>
              <p className="section-copy" style={{ color: "rgba(255,255,255,0.82)" }}>
                Beyond Expertise peut servir de base pour un site organisme de formation moderne, un portail client de suivi
                et une future plateforme e-learning plus riche, sans casser le parcours commercial.
              </p>
              <div className="home-interest-actions">
                <Link href="/devis" className="button button-primary">
                  Construire un parcours entreprise
                </Link>
                <Link href="/contact" className="button button-secondary-inverted">
                  Contacter notre équipe
                </Link>
              </div>
            </div>

            <div className="home-interest-panel">
              <span className="home-interest-panel-label">Un socle, plusieurs modules</span>
              <ul className="home-interest-features">
                {[
                  "Catalogue de formations structuré",
                  "Devis & tunnel commercial",
                  "Inscription en ligne",
                  "Espace client : demandes, validations, documents",
                  "Espaces LMS apprenant & formateur"
                ].map((feature) => (
                  <li key={feature}>
                    <Check size={16} strokeWidth={2.5} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="home-interest-panel-foot">
                <strong>{trainings.length}</strong>
                <span>formations déjà disponibles dans le socle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Resources ────────────────────────────────────── */}
      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Ressources &amp; analyses</span>
              <h2 className="section-title">Des analyses concrètes pour cadrer vos décisions data, IA et pilotage.</h2>
            </div>
            <div className="section-cta-inline">
              <p className="section-copy section-copy-narrow">
                Décryptages, retours d&apos;expérience et pages expertes pour aider vos équipes à faire les bons choix — du cas d&apos;usage à la mise en production.
              </p>
              <Link href="/ressources" className="button button-secondary">
                Voir toutes les ressources <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="home-resources-grid">
            <Link href="/ressources" className="home-resource-feature">
              <div className="home-resource-feature-media">
                <span className="home-resource-feature-tag">Dossier · Stratégie formation</span>
                <Sparkles size={30} strokeWidth={1.5} />
              </div>
              <div className="home-resource-feature-body">
                <span className="premium-category-accent">À la une</span>
                <h3>Comment structurer une offre de formation premium autour de la data, de l&apos;IA et du pilotage ?</h3>
                <p>
                  Usage, ROI, gouvernance et conduite du changement : les repères pour bâtir un dispositif de montée
                  en compétence réellement actionnable en entreprise.
                </p>
                <span className="home-resource-link">
                  Lire le dossier <ArrowRight size={16} strokeWidth={2} />
                </span>
              </div>
            </Link>

            <div className="home-resource-list">
              {resourceHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.slug} href={`/expertises/${item.slug}`} className="home-resource-card">
                    <div className="home-resource-thumb">
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className="home-resource-tag">{item.tag}</span>
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <span className="home-resource-link">
                        Lire l&apos;analyse <ArrowRight size={16} strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="home-faq-band">
            <div className="home-faq-copy">
              <span className="eyebrow eyebrow-dark">Questions fréquentes</span>
              <h2 className="section-title">Tout ce qu'il faut clarifier avant d'activer une demande, un devis ou un parcours entreprise.</h2>
              <p className="section-copy">
                Une FAQ bien structurée rassure, réduit les frictions et soutient à la fois la conversion et la qualité perçue du site.
              </p>
              <Link href="/contact" className="button button-primary">
                Contactez-nous
              </Link>
            </div>
            <div className="home-faq-list">
              <FAQ items={faqItems} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
