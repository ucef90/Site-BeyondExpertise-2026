import Link from "next/link";
import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import { FAQ } from "@/components/faq";
import { TrainingCard } from "@/components/training-card";
import { faqItems } from "@/lib/data";
import { getHomepageFeaturedTrainings, getTrainings, groupTrainingsByPremiumCategory } from "@/lib/api";

const resourceHighlights = [
  {
    slug: "copilot",
    title: "Copilot en entreprise : cadrer les cas d'usage qui apportent vite de la valeur",
    excerpt: "Une lecture orientee directions, PMO et fonctions support pour identifier les gains realsites et les garde-fous utiles."
  },
  {
    slug: "ai-security",
    title: "IA et gouvernance : comment accelerer sans ouvrir de nouveaux risques",
    excerpt: "Une synthese pour aligner innovation, conformite, securite et usages metier dans un meme cadre de decision."
  },
  {
    slug: "lakehouse",
    title: "Lakehouse, BI, IA : quels choix d'architecture pour une plateforme data moderne",
    excerpt: "Une ressource pour clarifier les arbitrages entre reporting, data engineering, IA et industrialisation des pipelines."
  }
];

const advantageTabs = [
  {
    label: "Formateurs",
    title: "Des formateurs experts et praticiens",
    description:
      "Nos parcours sont portes par des intervenants capables de relier theorie, cas concrets et contraintes d'execution en entreprise.",
    bullets: [
      "Double expertise metier et pedagogique",
      "Animation inter, intra et dispositifs sur-mesure",
      "Approche orientee applicabilite immediate"
    ]
  },
  {
    label: "Certifications",
    title: "Des parcours structures avec niveaux, prerequis et validation",
    description:
      "Le catalogue est pense pour aider chaque profil a choisir le bon niveau, la bonne modalite et un dispositif coherant pour monter en competence.",
    bullets: [
      "Fiches formation detaillees et lisibles",
      "Positionnement par niveau et objectifs",
      "Possibilite d'evaluation et de certification"
    ]
  },
  {
    label: "Entreprise",
    title: "Une logique de portail client et de parcours entreprise",
    description:
      "Au-dela du catalogue, Beyond Expertise permet de cadrer les demandes, suivre les devis, organiser les inscriptions et separer les usages client du LMS.",
    bullets: [
      "Tunnel commercial clair et rapide",
      "Suivi des demandes et validations",
      "Projection vers academie et portail B2B"
    ]
  }
];

export default async function HomePage() {
  const trainings = await getTrainings();
  const featuredTrainings = getHomepageFeaturedTrainings(trainings);
  const premiumGroups = groupTrainingsByPremiumCategory(trainings).slice(0, 4);

  const formatCount = new Set(trainings.map((training) => training.format)).size;
  const categoryCount = new Set(trainings.map((training) => training.category)).size;
  const upcomingCount = trainings.filter((training) => training.nextSession !== "Planification à venir").length;

  return (
    <main className="home-page-main">
      <section className="section section-tight">
        <div className="page-shell">
          <div className="home-hero-plb">
            <div className="home-hero-plb-copy">
              <span className="eyebrow">Catalogue premium | parcours entreprise | LMS</span>
              <h1 className="home-hero-plb-title">Trouvez la formation qui fera progresser vos equipes et vos priorites metier.</h1>
              <p className="home-hero-plb-copy-text">
                Data, BI, IA, gestion de projet, agile, business analysis et parcours entreprise :
                un catalogue structure pour aller vite du besoin a la bonne formation.
              </p>

              <form action="/formations" className="home-hero-plb-search">
                <input
                  name="q"
                  className="input home-hero-plb-search-input"
                  placeholder="IA, data, Power BI, agile, scrum, PMO..."
                />
                <button type="submit" className="home-hero-plb-search-button" aria-label="Rechercher">
                  <Search size={18} />
                </button>
              </form>

              <div className="home-hero-plb-proof">
                {[
                  "Formations inter, intra et parcours entreprise",
                  "Catalogue structure par expertises metier",
                  "Espace client distinct des espaces LMS"
                ].map((item) => (
                  <div key={item} className="hero-proof-item hero-proof-item-light">
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="home-hero-plb-actions">
                <Link href="/formations" className="button button-primary">
                  Explorer le catalogue <ArrowRight size={18} />
                </Link>
                <Link href="/devis" className="button button-secondary button-secondary-inverted">
                  Demander un devis
                </Link>
              </div>
            </div>

            <div className="home-hero-plb-side">
              <div className="home-hero-plb-photo card">
                <div className="home-hero-plb-photo-grid">
                  <div className="home-hero-plb-photo-cell home-hero-plb-photo-main" />
                  <div className="home-hero-plb-photo-cell home-hero-plb-photo-top" />
                  <div className="home-hero-plb-photo-cell home-hero-plb-photo-bottom" />
                </div>
              </div>

              <div className="home-hero-plb-kpi">
                <div className="home-hero-plb-kpi-card card">
                  <strong>{trainings.length}</strong>
                  <span>formations actives dans le catalogue</span>
                </div>
                <div className="home-hero-plb-kpi-card card">
                  <strong>{upcomingCount}</strong>
                  <span>formations avec prochaines sessions visibles</span>
                </div>
              </div>

              <Link href="/formations" className="home-hero-plb-floating-cta">
                Voir toutes nos formations <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Formations les plus demandees</span>
              <h2 className="section-title section-title-wide">Une selection immediate pour les sujets les plus porteurs du catalogue.</h2>
            </div>
            <div className="section-cta-inline">
              <p className="section-copy section-copy-narrow">
                SQL, Power BI, PMO, Scrum, Copilot, AI Agents et data : les parcours les plus visibles pour les demandes inter et entreprise.
              </p>
              <Link href="/formations" className="button button-secondary">
                Decouvrir tout le catalogue
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

      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="home-stats-panel">
            <div className="home-stats-grid">
              <article className="home-stat-card">
                <strong>{trainings.length}</strong>
                <h3>formations au catalogue</h3>
                <p>Un socle structure autour des usages data, IA, pilotage, agile et business analysis.</p>
              </article>
              <article className="home-stat-card">
                <strong>{premiumGroups.length}</strong>
                <h3>univers metier prioritaires</h3>
                <p>Des categories premium pour accelerer l'orientation des directions, PMO, analysts et equipes data.</p>
              </article>
              <article className="home-stat-card">
                <strong>{formatCount}</strong>
                <h3>modalites de suivi</h3>
                <p>Presentiel, distanciel, hybride et e-learning selon le contexte de deploiement.</p>
              </article>
              <article className="home-stat-card">
                <strong>{categoryCount}</strong>
                <h3>domaines et sous-domaines</h3>
                <p>Un catalogue pense pour couvrir la montee en competence de plusieurs fonctions et niveaux.</p>
              </article>
            </div>

            <div className="home-stats-copy">
              <span className="eyebrow eyebrow-dark">Chiffres cles</span>
              <h2 className="section-title">Une base de catalogue serieuse pour cadrer vite un projet de formation.</h2>
              <p className="section-copy">
                Beyond Expertise combine catalogue, tunnel commercial, espace client et projection LMS dans une architecture claire,
                avec de vraies fiches formation, des parcours prioritaires et une logique de portail entreprise.
              </p>
              <Link href="/a-propos" className="button button-secondary button-secondary-inverted">
                En savoir plus sur Beyond Expertise
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="home-advantages-panel">
            <div className="home-advantages-head">
              <div>
                <span className="eyebrow eyebrow-dark">Nos atouts</span>
                <h2 className="section-title">Les fondamentaux d'un organisme de formation premium, lisible et moderne.</h2>
                <p className="section-copy">
                  Le site n'expose pas seulement un catalogue : il structure une offre pedagogique, commerciale et LMS capable de monter en maturite.
                </p>
              </div>
              <div className="home-advantage-tabs" aria-hidden="true">
                {advantageTabs.map((tab, index) => (
                  <span key={tab.label} className={`home-advantage-tab${index === 0 ? " is-active" : ""}`}>
                    {tab.label}
                  </span>
                ))}
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

      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Univers metier</span>
              <h2 className="section-title section-title-wide">Des categories premium pour orienter rapidement chaque equipe vers le bon parcours.</h2>
            </div>
            <p className="section-copy section-copy-narrow">
              Chaque univers regroupe les formations les plus utiles pour un metier, un niveau et un objectif de transformation.
            </p>
          </div>

          <div className="feature-grid feature-grid-tight" style={{ marginTop: 24 }}>
            {premiumGroups.map((group) => (
              <article key={group.key} className="card premium-category-card" style={{ gridColumn: "span 3", padding: 22 }}>
                <span className="premium-category-accent">{group.accent}</span>
                <h3 style={{ marginBottom: 10 }}>{group.title}</h3>
                <p className="section-copy" style={{ margin: 0 }}>{group.description}</p>
                <p className="premium-category-audience">{group.audience}</p>
                <p className="premium-category-count">{group.trainings.length} formations associees</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="home-interest-band">
            <div className="home-interest-copy">
              <span className="eyebrow eyebrow-dark">Projet entreprise</span>
              <h2 className="section-title">Un meme socle pour le catalogue, le devis, l'inscription, l'espace client et les espaces LMS.</h2>
              <p className="section-copy">
                Beyond Expertise peut servir de base pour un site organisme de formation moderne, un portail client de suivi
                et une future plateforme e-learning plus riche, sans casser le parcours commercial.
              </p>
              <div className="home-interest-actions">
                <Link href="/devis" className="button button-primary">
                  Construire un parcours entreprise
                </Link>
                <Link href="/contact" className="button button-secondary button-secondary-inverted">
                  Contacter notre equipe
                </Link>
              </div>
            </div>

            <div className="home-interest-mosaic">
              <div className="home-interest-mosaic-card home-interest-mosaic-media" />
              <div className="home-interest-mosaic-card home-interest-mosaic-stat">
                <strong>{upcomingCount}+</strong>
                <span>prochaines sessions visibles</span>
              </div>
              <div className="home-interest-mosaic-card home-interest-mosaic-media-alt" />
              <div className="home-interest-mosaic-card home-interest-mosaic-gradient" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Ressources</span>
              <h2 className="section-title">Des contenus utiles pour nourrir la decision, le SEO et les echanges commerciaux.</h2>
            </div>
            <div className="section-cta-inline">
              <p className="section-copy section-copy-narrow">
                Articles, pages expertes et actualites permettent d'appuyer la credibilite du site et de capter des intentions de recherche plus larges.
              </p>
              <Link href="/ressources" className="button button-secondary">
                Voir toutes les ressources
              </Link>
            </div>
          </div>

          <div className="home-resources-grid">
            <article className="home-resource-feature">
              <div className="home-resource-feature-media" />
              <div className="home-resource-feature-body">
                <span className="premium-category-accent">A la une</span>
                <h3>Comment structurer une offre formation premium autour de la data, de l'IA et du pilotage ?</h3>
                <p>
                  Une ligne editoriale orientee usage, ROI, gouvernance et transformation permet d'installer Beyond Expertise comme acteur credible
                  sur les sujets les plus demandés du marche.
                </p>
              </div>
            </article>

            <div className="home-resource-list">
              {resourceHighlights.map((item) => (
                <article key={item.slug} className="home-resource-card">
                  <div className="home-resource-thumb" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <Link href={`/expertises/${item.slug}`} className="home-resource-link">
                      Lire la page expertise <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="page-shell">
          <div className="home-faq-band">
            <div className="home-faq-copy">
              <span className="eyebrow">Questions frequentes</span>
              <h2 className="section-title">Tout ce qu'il faut clarifier avant d'activer une demande, un devis ou un parcours entreprise.</h2>
              <p className="section-copy">
                Une FAQ bien structuree rassure, reduit les frictions et soutient a la fois la conversion et la qualite percue du site.
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
