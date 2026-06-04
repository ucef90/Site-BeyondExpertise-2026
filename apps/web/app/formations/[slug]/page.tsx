import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Download, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { getTrainingBySlug } from "@/lib/api";
import { FAQ } from "@/components/faq";
import { TrainingSidebarLeadForm } from "@/components/forms";

export default async function TrainingDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const training = await getTrainingBySlug(slug);

  if (!training) {
    notFound();
  }

  return (
    <main className="section page-main-compact">
      <div className="page-shell">
        <div className="training-detail-hero">
          <section>
            <div className="breadcrumb-row">
              <Link href="/formations">Catalogue</Link>
              <span>/</span>
              <span>{training.category}</span>
            </div>
            <span className="eyebrow">{training.category}</span>
            <h1 className="section-title training-detail-title" style={{ maxWidth: "unset" }}>{training.title}</h1>
            <p className="section-copy">{training.summary}</p>
            <div className="training-kpis">
              <div className="training-kpi">
                <CalendarDays size={18} />
                <span>{training.duration}</span>
              </div>
              <div className="training-kpi">
                <GraduationCap size={18} />
                <span>{training.level}</span>
              </div>
              <div className="training-kpi">
                <Users size={18} />
                <span>{training.format}</span>
              </div>
              <div className="training-kpi">
                <ShieldCheck size={18} />
                <span>{training.priceFrom}</span>
              </div>
            </div>

            <div className="training-detail-intro-card">
              <div className="training-detail-intro-item">
                <strong>Pour qui ?</strong>
                <span>{training.audience || "Managers, experts et équipes souhaitant structurer une montée en compétence claire et opérationnelle."}</span>
              </div>
              <div className="training-detail-intro-item">
                <strong>Ce que vous obtenez</strong>
                <span>Un parcours actionnable, une lecture rapide du niveau visé et un cadre de déploiement adapté à votre contexte.</span>
              </div>
            </div>

            <div className="training-content-stack">
              <div className="card training-content-card">
                <h2>Objectifs pédagogiques</h2>
                <div className="training-goals">
                  {training.goals.map((goal) => (
                    <div key={goal} className="training-goal-item">
                      <ShieldCheck size={18} />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card training-content-card">
                <h2>Programme détaillé</h2>
                <div className="training-program-grid">
                  {[
                    "Cadrage des enjeux métier et des usages prioritaires",
                    "Méthodes, outils et bonnes pratiques à connaître",
                    "Mise en situation sur des cas concrets",
                    "Points de vigilance, erreurs fréquentes et recommandations terrain"
                  ].map((item, index) => (
                    <article key={item} className="training-program-item">
                      <span className="premium-category-accent">Module 0{index + 1}</span>
                      <h3>{item}</h3>
                      <p className="section-copy" style={{ marginBottom: 0 }}>
                        Un contenu structuré pour alterner apports, ateliers, cas pratiques, ressources et mise en application opérationnelle.
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="training-audience-grid">
                <div className="card training-content-card">
                  <h2>Prérequis</h2>
                  <p className="section-copy">{training.prerequisites || "Aucun prérequis bloquant n'est nécessaire pour suivre cette formation dans de bonnes conditions."}</p>
                </div>
                <div className="card training-content-card">
                  <h2>Public cible</h2>
                  <p className="section-copy">{training.audience || "Professionnels, managers et décideurs souhaitant structurer leur montée en compétence."}</p>
                </div>
              </div>

              <div className="card training-content-card">
                <h2>Pourquoi cette formation intéresse les entreprises</h2>
                <p className="section-copy">
                  Cette formation aide les décideurs, responsables formation et managers à évaluer rapidement l’intérêt du parcours, le niveau visé, le format le plus adapté et les prochaines disponibilités.
                </p>
              </div>

              <div className="card training-content-card">
                <h2>FAQ formation</h2>
                <FAQ
                  items={[
                    {
                      question: "Cette formation peut-elle être déployée en intra ?",
                      answer: "Oui, la structure prévoit les modalités inter, intra et sur-mesure avec adaptation du contenu au contexte entreprise."
                    },
                    {
                      question: "Un programme PDF est-il disponible ?",
                      answer: "Oui, un programme PDF et des supports complémentaires peuvent être associés à chaque formation selon le besoin."
                    },
                    {
                      question: "Peut-on ajouter une partie e-learning ?",
                      answer: "Oui, la formation peut être prolongée par des ressources LMS, des quiz, des modules vidéo ou un parcours blended."
                    }
                  ]}
                />
              </div>
            </div>
          </section>

          <aside className="training-sidepanel">
            <div className="card training-sidecard">
              <h3>Informations clés</h3>
              <div className="detail-info-list">
                <div className="detail-info-item">
                  <span>Durée</span>
                  <strong>{training.duration}</strong>
                </div>
                <div className="detail-info-item">
                  <span>Niveau</span>
                  <strong>{training.level}</strong>
                </div>
                <div className="detail-info-item">
                  <span>Format</span>
                  <strong>{training.format}</strong>
                </div>
                <div className="detail-info-item">
                  <span>Tarif</span>
                  <strong>{training.priceFrom}</strong>
                </div>
                <div className="detail-info-item">
                  <span>Prochaine session</span>
                  <strong>{training.nextSession}</strong>
                </div>
              </div>
              {training.sessions?.length ? (
                <div style={{ marginTop: 14 }}>
                  <strong>Sessions disponibles</strong>
                  {training.sessions.map((session) => (
                    <p key={session.id} style={{ marginBottom: 6 }}>
                      {new Intl.DateTimeFormat("fr-FR").format(new Date(session.startDate))}
                      {session.city ? ` • ${session.city}` : ""}
                    </p>
                  ))}
                </div>
              ) : null}
              <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
                <Link href={`/inscription?training=${training.slug}`} className="button button-primary">Demander une inscription</Link>
                <Link href="/devis" className="button button-accent">Demander un devis</Link>
                <Link href="/contact" className="button button-secondary">Parler à un conseiller</Link>
              </div>
            </div>

            <div className="card training-sidecard">
              <h3>Recevoir une proposition rapide</h3>
              <p className="section-copy" style={{ marginTop: 0 }}>
                Laissez vos coordonnées pour être recontacté rapidement au sujet de cette formation, en inter ou en intra entreprise.
              </p>
              <TrainingSidebarLeadForm trainingSlug={training.slug} trainingTitle={training.title} />
            </div>

            <div className="card training-sidecard">
              <h3>Téléchargements & options</h3>
              <div className="catalog-highlight-list">
                <div className="catalog-highlight-item">
                  <strong>Programme PDF</strong>
                  <span>Version téléchargeable à brancher via les documents formation.</span>
                </div>
                <div className="catalog-highlight-item">
                  <strong>Modalité entreprise</strong>
                  <span>Session intra, adaptation secteur, niveau et contexte client.</span>
                </div>
                <div className="catalog-highlight-item">
                  <strong>Ressources apprenant</strong>
                  <span>Supports, LMS, quiz et certificat peuvent être ajoutés au parcours.</span>
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <Link href="/devis" className="button button-secondary">
                  <Download size={16} />
                  Recevoir le programme
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
