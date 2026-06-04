import Link from "next/link";
import { CatalogExplorer } from "@/app/formations/catalog-explorer";
import { getPriorityTrainings, getTrainings, groupTrainingsByPremiumCategory } from "@/lib/api";

export default async function TrainingsPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const trainings = await getTrainings();
  const priorityTrainings = getPriorityTrainings(trainings);
  const premiumGroups = groupTrainingsByPremiumCategory(trainings);
  const premiumCount = premiumGroups.length;
  const params = searchParams ? await searchParams : undefined;
  const initialQuery = params?.q?.trim() ?? "";

  return (
    <main className="section section-tight-top catalog-page-main">
      <div className="page-shell">
        <section className="catalog-page-hero card">
          <div className="catalog-page-hero-copy">
            <span className="eyebrow">Catalogue</span>
            <h1 className="section-title catalog-page-title">Choisissez plus vite la bonne formation pour vos équipes et vos priorités métier.</h1>
            <p className="section-copy">
              Le catalogue Beyond Expertise réunit recherche, filtres, univers métier et fiches détaillées pour faciliter la découverte, la qualification et la prise de décision.
            </p>
            <div className="catalog-page-tags">
              <span className="catalog-page-tag">Data & BI</span>
              <span className="catalog-page-tag">IA & Copilot</span>
              <span className="catalog-page-tag">Agile & Scrum</span>
              <span className="catalog-page-tag">PMO & Projet</span>
              <span className="catalog-page-tag">Business Analysis</span>
            </div>
          </div>
          <aside className="catalog-page-sidecard">
            <div className="catalog-page-kpis">
              <div className="catalog-page-kpi">
                <strong>{trainings.length}</strong>
                <span>formations actives</span>
              </div>
              <div className="catalog-page-kpi">
                <strong>{priorityTrainings.length}</strong>
                <span>formations prioritaires</span>
              </div>
              <div className="catalog-page-kpi">
                <strong>{premiumCount}</strong>
                <span>univers premium</span>
              </div>
              <div className="catalog-page-kpi">
                <strong>4</strong>
                <span>modalités de suivi</span>
              </div>
            </div>

            <div className="catalog-page-side-highlight">
              <span className="catalog-page-side-label">Accès rapide</span>
              <strong>Repérez rapidement une formation inter, intra, e-learning ou un parcours sur-mesure.</strong>
              <span>Le catalogue est structuré pour la découverte rapide, la qualification commerciale et l’orientation entreprise.</span>
            </div>

            <div className="catalog-page-side-actions">
              <Link href="/devis" className="catalog-page-action">
                <strong>Besoin d&apos;un parcours entreprise ?</strong>
                <span>Construire un dispositif intra, sur-mesure ou multi-équipes.</span>
              </Link>
              <Link href="/contact" className="catalog-page-action">
                <strong>Être orienté rapidement</strong>
                <span>Identifier le bon niveau, la bonne modalité et la bonne sélection.</span>
              </Link>
            </div>
          </aside>
        </section>

        <CatalogExplorer
          trainings={trainings}
          priorityTrainings={priorityTrainings}
          premiumGroups={premiumGroups}
          initialQuery={initialQuery}
        />

        <section className="catalog-bottom-band" style={{ marginTop: 48 }}>
          <div>
            <span className="eyebrow">Besoin entreprise</span>
            <h2 style={{ margin: "16px 0 10px", fontSize: "clamp(1.7rem, 2.8vw, 2.5rem)" }}>
              Vous cherchez un parcours intra ou une sélection sur-mesure ?
            </h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>
              Le catalogue peut être transformé en programme entreprise selon votre secteur, votre niveau de maturité et vos objectifs de montée en compétence.
            </p>
          </div>
          <div className="catalog-highlight-list">
            <Link href="/devis" className="catalog-highlight-item">
              <strong>Demander un devis personnalisé</strong>
              <span>Construire un dispositif adapté à vos équipes et à votre contexte.</span>
            </Link>
            <Link href="/contact" className="catalog-highlight-item">
              <strong>Être orienté vers les bonnes formations</strong>
              <span>Qualifier rapidement le bon niveau, le bon format et le bon périmètre.</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
