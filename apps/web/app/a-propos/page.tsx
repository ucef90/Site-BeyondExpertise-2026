import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A propos | Beyond Expertise",
  description: "Decouvrez Beyond Expertise, son positionnement, sa mission et son ambition de construire une plateforme formation premium et evolutive."
};

export default function AboutPage() {
  return (
    <main className="section page-main-compact">
      <div className="page-shell">
        <span className="eyebrow">A propos</span>
        <h1 className="section-title">Une marque de formation construite pour allier expertise, execution et impact.</h1>
        <p className="section-copy">
          Beyond Expertise accompagne les organisations qui veulent professionnaliser leurs parcours de formation, accelerer les competences critiques et faire converger contenu, conversion et experience apprenant dans une meme plateforme.
        </p>
        <div className="feature-grid" style={{ marginTop: 28 }}>
          <article className="card" style={{ gridColumn: "span 4", padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Positionnement</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>
              Une approche premium orientee transformation, data, IA, management, projet et montee en competence des equipes.
            </p>
          </article>
          <article className="card" style={{ gridColumn: "span 4", padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Promesse</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>
              Des offres lisibles, des contenus utiles, un tunnel commercial clair et une architecture prete pour l'e-learning et le SaaS.
            </p>
          </article>
          <article className="card" style={{ gridColumn: "span 4", padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Mode d'intervention</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>
              Inter, intra, academies d'entreprise, programmes blended et accompagnement sur-mesure selon vos enjeux.
            </p>
          </article>
        </div>
        <div style={{ marginTop: 28 }}>
          <Link href="/devis" className="button button-primary">Construire un projet avec Beyond Expertise</Link>
        </div>
      </div>
    </main>
  );
}
