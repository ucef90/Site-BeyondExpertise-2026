import Link from "next/link";

const TRAINER_LMS_URL = process.env.NEXT_PUBLIC_LMS_TRAINER_URL;

export default function TrainerPage() {
  return (
    <main className="section page-main-compact">
      <div className="page-shell">
        <span className="eyebrow">Espace formateur</span>
        <h1 className="section-title">Accès formateur et pilotage des sessions LMS.</h1>
        <p className="section-copy">
          L’espace formateur est conçu pour renvoyer vers le LMS afin de gérer les sessions, ressources, évaluations, présence et suivi des apprenants. Si l’URL LMS formateur est configurée, ce bouton peut pointer directement vers votre portail dédié.
        </p>
        <div className="feature-grid" style={{ marginTop: 28 }}>
          {[
            ["Sessions et planning", "Animation, affectation, calendrier et suivi des cohortes."],
            ["Ressources pédagogiques", "Supports, devoirs, modules, quiz et documents de session."],
            ["Évaluations", "Présence, validation, feedback, notation et suivi de complétion."]
          ].map(([title, copy]) => (
            <article key={title} className="card" style={{ gridColumn: "span 4", padding: 24 }}>
              <h3>{title}</h3>
              <p className="section-copy">{copy}</p>
            </article>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
          <a href={TRAINER_LMS_URL || "/contact"} className="button button-primary">
            {TRAINER_LMS_URL ? "Accéder au LMS formateur" : "Configurer l'accès LMS formateur"}
          </a>
          <Link href="/espace" className="button button-secondary">
            Voir l'espace client
          </Link>
        </div>
      </div>
    </main>
  );
}
