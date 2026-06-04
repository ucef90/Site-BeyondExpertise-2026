import Link from "next/link";

const LEARNER_LMS_URL = process.env.NEXT_PUBLIC_LMS_LEARNER_URL;

export default function LearnerPage() {
  return (
    <main className="section page-main-compact">
      <div className="page-shell">
        <span className="eyebrow">Espace apprenant</span>
        <h1 className="section-title">Accéder au LMS pour suivre ses parcours, sa progression et ses résultats.</h1>
        <p className="section-copy">
          L’espace apprenant est destiné à renvoyer vers le LMS, où l’utilisateur retrouve ses cours, modules, quiz, certificats, progression et prochaines activités pédagogiques.
        </p>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 28 }}>
          <section className="card" style={{ padding: 24 }}>
            <h2>Cours attribués</h2>
            <p className="section-copy">Tableau de bord apprenant avec progression, temps passé, calendrier et activités à compléter.</p>
          </section>
          <section className="card" style={{ padding: 24 }}>
            <h2>Quiz et certificats</h2>
            <p className="section-copy">Le socle prévoit les tentatives, scores, validation de fin de parcours et génération de certificats.</p>
          </section>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
          <a href={LEARNER_LMS_URL || "/contact"} className="button button-primary">
            {LEARNER_LMS_URL ? "Accéder au LMS apprenant" : "Configurer l'accès LMS apprenant"}
          </a>
          <Link href="/espace" className="button button-secondary">
            Voir l'espace client
          </Link>
        </div>
      </div>
    </main>
  );
}
