export type Training = {
  id: string;
  slug: string;
  title: string;
  category: string;
  format: string;
  level: string;
  duration: string;
  priceFrom: string;
  nextSession: string;
  summary: string;
  goals: string[];
};

export const featuredTrainings: Training[] = [
  {
    id: "tr-ia",
    slug: "ia-generative-pour-les-organisations",
    title: "IA générative pour les organisations",
    category: "Transformation digitale",
    format: "Hybride",
    level: "Intermédiaire",
    duration: "2 jours",
    priceFrom: "1 490 € HT",
    nextSession: "12/05/2026",
    summary: "Structurer l’adoption de l’IA générative avec une approche métier, gouvernance et outillage.",
    goals: ["Cadrer les usages", "Évaluer les risques", "Lancer un plan de déploiement"]
  },
  {
    id: "tr-lead",
    slug: "leadership-et-management-de-la-performance",
    title: "Leadership et management de la performance",
    category: "Leadership",
    format: "Présentiel / Distanciel",
    level: "Fondamental",
    duration: "3 jours",
    priceFrom: "1 790 € HT",
    nextSession: "19/05/2026",
    summary: "Développer une posture managériale claire, exigeante et durable.",
    goals: ["Piloter les objectifs", "Renforcer la communication", "Conduire des feedbacks efficaces"]
  },
  {
    id: "tr-data",
    slug: "data-literacy-pour-decideurs",
    title: "Data literacy pour décideurs",
    category: "Data",
    format: "Distanciel",
    level: "Fondamental",
    duration: "1 jour",
    priceFrom: "990 € HT",
    nextSession: "03/06/2026",
    summary: "Comprendre les indicateurs, les biais et les usages décisionnels de la donnée.",
    goals: ["Lire un tableau de bord", "Poser les bonnes questions", "Réduire les erreurs d’interprétation"]
  }
];

export const faqItems = [
  {
    question: "Comment réserver une formation ?",
    answer: "Depuis chaque fiche formation, vous pouvez demander un devis, lancer une inscription ou échanger avec un conseiller. Nous revenons vers vous sous 24 à 48 h ouvrées pour cadrer votre besoin."
  },
  {
    question: "Quelles modalités proposez-vous (inter, intra, distanciel) ?",
    answer: "Nos formations existent en inter-entreprises, en intra sur-mesure dans vos locaux, en distanciel (classe virtuelle) ou en format hybride, selon votre contexte et vos contraintes."
  },
  {
    question: "Vos formations sont-elles finançables (OPCO, CPF) ?",
    answer: "Oui. Beyond Expertise est un organisme certifié Qualiopi : nos parcours sont éligibles aux dispositifs de financement (OPCO, plan de développement des compétences, CPF selon les formations). Notre équipe vous aide à monter le dossier."
  },
  {
    question: "Proposez-vous des parcours entreprise sur-mesure ?",
    answer: "Oui. Nous construisons des dispositifs dédiés : cadrage des besoins, sélection des modules, sessions réservées à vos équipes et suivi des inscriptions multi-participants depuis l'espace client."
  },
  {
    question: "Y a-t-il une certification ou une évaluation des acquis ?",
    answer: "La plupart des parcours intègrent une évaluation des acquis, et certaines formations préparent à une certification. La certification Qualiopi garantit la qualité de notre processus de formation."
  },
  {
    question: "Le LMS et l'espace apprenant sont-ils intégrés ?",
    answer: "Oui. Un espace apprenant est prévu (progression, modules, quiz, certificats), distinct de l'espace client utilisé pour vos demandes, devis et documents."
  }
];
