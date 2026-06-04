import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions Entreprises | Beyond Expertise",
  description: "Des parcours entreprises, academies metier, dispositifs intra et programmes blended pour accelerer les competences critiques."
};

export default function CompaniesPage() {
  return (
    <main className="section page-main-compact">
      <div className="page-shell">
        <span className="eyebrow">Entreprises</span>
        <h1 className="section-title">Des dispositifs formation adaptes aux enjeux des organisations ambitieuses.</h1>
        <p className="section-copy">
          Beyond Expertise construit des parcours intra et des offres sur-mesure pour les entreprises qui veulent faire monter rapidement leurs equipes sur la data, l'IA, le pilotage et la transformation.
        </p>
        <div className="feature-grid" style={{ marginTop: 28 }}>
          <article className="card" style={{ gridColumn: "span 4", padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Parcours intra</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>Sessions dediees, contextualisees et alignees sur vos cas d'usage metier.</p>
          </article>
          <article className="card" style={{ gridColumn: "span 4", padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Academies metier</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>Programmes en cohortes pour structurer des montees en competence durables.</p>
          </article>
          <article className="card" style={{ gridColumn: "span 4", padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Offres blended</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>Combinaison de sessions live, ressources e-learning, coaching et suivi post-formation.</p>
          </article>
        </div>
        <div style={{ marginTop: 28 }}>
          <Link href="/devis" className="button button-primary">Demander une proposition entreprise</Link>
        </div>
      </div>
    </main>
  );
}
