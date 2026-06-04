import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodologie | Beyond Expertise",
  description: "La methodologie Beyond Expertise pour cadrer les besoins, structurer les parcours et deployer des formations a forte valeur business."
};

export default function MethodologyPage() {
  return (
    <main className="section page-main-compact">
      <div className="page-shell">
        <span className="eyebrow">Methodologie</span>
        <h1 className="section-title">Une methodologie pensee pour la valeur business avant le volume de contenu.</h1>
        <p className="section-copy">
          Beyond Expertise structure ses dispositifs autour du cadrage des besoins, de la priorisation des cas d'usage, de la qualite pedagogique et de l'activation terrain apres formation.
        </p>
        <div className="feature-grid" style={{ marginTop: 28 }}>
          <article className="card" style={{ gridColumn: "span 3", padding: 24 }}>
            <span className="premium-category-accent">01</span>
            <h2 style={{ marginTop: 14 }}>Cadrer</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>Identifier les bons publics, les enjeux et les resultats attendus.</p>
          </article>
          <article className="card" style={{ gridColumn: "span 3", padding: 24 }}>
            <span className="premium-category-accent">02</span>
            <h2 style={{ marginTop: 14 }}>Prioriser</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>Choisir les formats, cas d'usage et modules les plus utiles au contexte.</p>
          </article>
          <article className="card" style={{ gridColumn: "span 3", padding: 24 }}>
            <span className="premium-category-accent">03</span>
            <h2 style={{ marginTop: 14 }}>Executer</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>Delivrer un parcours lisible, engageant et compatible avec les contraintes du terrain.</p>
          </article>
          <article className="card" style={{ gridColumn: "span 3", padding: 24 }}>
            <span className="premium-category-accent">04</span>
            <h2 style={{ marginTop: 14 }}>Mesurer</h2>
            <p className="section-copy" style={{ marginBottom: 0 }}>Suivre l'adoption, la satisfaction et la mise en pratique dans la duree.</p>
          </article>
        </div>
      </div>
    </main>
  );
}
