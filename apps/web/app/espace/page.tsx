export default function DashboardPage() {
  return (
    <main className="section page-main-compact">
      <div className="page-shell">
        <span className="eyebrow">Espace client</span>
        <h1 className="section-title">Piloter les demandes, les devis, les validations et les documents client.</h1>
        <p className="section-copy">
          L’espace client Beyond Expertise n’est pas le LMS : il est conçu pour suivre les demandes commerciales, les devis, les inscriptions, les validations et l’historique administratif de vos projets.
        </p>
        <div className="cards-grid">
          {[
            ["Mes demandes", "4 demandes commerciales suivies"],
            ["Mes devis", "2 devis à valider ou en attente de retour"],
            ["Mes inscriptions", "3 inscriptions en cours de traitement"],
            ["Mes documents", "Programmes, propositions et pièces partagées"]
          ].map(([title, copy]) => (
            <article key={title} className="card" style={{ gridColumn: "span 3", padding: 24 }}>
              <h3>{title}</h3>
              <p className="section-copy">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
