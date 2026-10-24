export const profile = {
  name: "Abraham Konan Kouamé",
  shortName: "Abraham Konan",
  role: "Développeur Backend",
  location: "Abidjan, Côte d'Ivoire",
  email: "abrahamkonany@gmail.com",
  phone: "+225 01 41 82 29 18",
  phoneHref: "tel:+2250141822918",
  website: "https://abrahamkonany.com",
};

export const stats = [
  { value: "3+", label: "ans d'expérience backend" },
  { value: "6", label: "moyens de paiement intégrés" },
  { value: "4 000+", label: "utilisateurs servis sur Money Fusion" },
  { value: "K3s", label: "infrastructure en production" },
];

export const expertise = [
  {
    title: "API & Architecture",
    description:
      "APIs REST sécurisées et versionnées, découpage en modules et microservices, Clean Architecture pour garder un code lisible quand le produit grandit.",
    tags: ["NestJS", "Express", "TypeScript", "Clean Architecture", "JWT", "OAuth2"],
  },
  {
    title: "Paiements & Intégrations",
    description:
      "Flux de paiement de bout en bout : cartes, PayPal et Mobile Money africain. Webhooks idempotents, réconciliation et logistique (UPS, USPS, Shippo).",
    tags: ["Stripe", "PayPal", "Orange Money", "MTN Money", "Wave", "Moov Money"],
  },
  {
    title: "Infrastructure & DevOps",
    description:
      "Conteneurisation, orchestration Kubernetes/K3s, déploiements GitOps et pipelines CI/CD qui rendent la mise en production banale.",
    tags: ["Docker", "Kubernetes (K3s)", "Argo CD", "GitHub Actions", "Nginx", "Traefik", "AWS"],
  },
  {
    title: "Données & Asynchrone",
    description:
      "Modélisation relationnelle et documentaire, cache, files de traitement et événements pour sortir le travail lent du chemin critique.",
    tags: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "BullMQ", "Kafka"],
  },
];

export const principles = [
  {
    title: "Le chemin critique reste court",
    body: "Ce qui peut attendre passe en file (BullMQ, Kafka). L'utilisateur reçoit une réponse rapide, le reste suit en arrière-plan.",
  },
  {
    title: "Un webhook arrive toujours deux fois",
    body: "Clés d'idempotence, vérification des signatures et états explicites : un paiement ne doit jamais être compté en double.",
  },
  {
    title: "La mise en prod est un non-événement",
    body: "Images Docker reproductibles, pipelines CI/CD et déploiement GitOps avec Argo CD. Revenir en arrière prend une minute.",
  },
  {
    title: "La sécurité se conçoit dès le schéma",
    body: "Validation stricte des entrées, JWT / OAuth2, principe du moindre privilège et secrets hors du code.",
  },
];

export const experiences = [
  {
    company: "Ndaya Inc.",
    role: "Développeur Backend (JavaScript / TypeScript)",
    period: "08/2024 — Aujourd'hui",
    current: true,
    points: [
      "Développement et maintenance des API backend de la plateforme e-commerce Ndaya.",
      "Intégration des paiements (Stripe, PayPal, Mobile Money) et des services logistiques (UPS, USPS).",
      "Conception de l'architecture backend avec NestJS, Prisma et MongoDB.",
      "Mise en place de l'infrastructure Docker, Kubernetes/K3s et des pipelines CI/CD.",
      "Optimisation des performances, de la sécurité et de la disponibilité des services.",
    ],
    stack: ["NestJS", "Prisma", "MongoDB", "Stripe", "K3s", "CI/CD"],
  },
  {
    company: "Synergie Tech Solutions (STS SARL)",
    role: "Développeur Full Stack",
    period: "07/2024 — 12/2024",
    points: [
      "Développement et maintenance du site web de l'entreprise.",
      "Administration et support du système d'information interne.",
      "Conception de fonctionnalités répondant aux besoins métiers, maintenance corrective et évolutive.",
    ],
    stack: ["Node.js", "React", "Next.js"],
  },
  {
    company: "CONHOU Innovation Group",
    role: "Développeur Backend Freelance",
    period: "04/2024 — 07/2024",
    points: [
      "Développement d'API backend pour plusieurs projets digitaux.",
      "Conception des bases de données et des architectures applicatives.",
      "Optimisation des performances, de la sécurité et de la stabilité.",
    ],
    stack: ["Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    company: "SC Digital",
    role: "Développeur Backend",
    period: "12/2023 — 04/2024",
    points: [
      "Développement du backend de la plateforme Money Fusion (+4 000 utilisateurs).",
      "Conception d'API REST sécurisées et performantes.",
      "Optimisation de l'architecture, des bases de données et des performances.",
    ],
    stack: ["Node.js", "Express", "MongoDB"],
  },
  {
    company: "NaN Digital Academy",
    role: "Développeur JavaScript Junior (Stage)",
    period: "01/2023 — 02/2024",
    points: [
      "Applications web et API REST avec Node.js, Express.js et MongoDB.",
      "Analyse, développement, tests et déploiement au sein d'équipes agiles.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Scrum"],
  },
];

export const projects = [
  {
    name: "Plateforme e-commerce Ndaya",
    context: "Ndaya Inc. · depuis 2024",
    summary:
      "Backend d'une plateforme e-commerce : catalogue, commandes, paiements multi-fournisseurs et expédition, déployé sur un cluster K3s.",
    highlights: [
      "Paiements cartes, PayPal et Mobile Money derrière une interface unique",
      "Étiquettes et suivi d'expédition via UPS et USPS",
      "Infrastructure Docker / K3s et pipelines CI/CD mis en place",
    ],
    stack: ["NestJS", "Prisma", "MongoDB", "Stripe", "PayPal", "K3s", "GitHub Actions"],
  },
  {
    name: "Money Fusion",
    context: "SC Digital · 2023 – 2024",
    summary:
      "Backend d'une plateforme fintech utilisée par plus de 4 000 utilisateurs, avec des API REST sécurisées au cœur du produit.",
    highlights: [
      "API REST sécurisées pour les opérations utilisateurs",
      "Optimisation du schéma de données et des requêtes",
      "Optimisation de l'architecture et des performances applicatives",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    name: "Vitrine Déco",
    context: "E-commerce · décoration maison",
    summary:
      "Backend d'une plateforme e-commerce spécialisée dans la vente de produits de décoration pour la maison.",
    highlights: [
      "API REST Node.js / Express pour le catalogue et les commandes",
      "Modèle de données relationnel avec Prisma et PostgreSQL",
      "Application conteneurisée avec Docker et déploiement automatisé par CI/CD",
    ],
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "Docker", "CI/CD"],
  },
  {
    name: "Stock Vitrine Déco",
    context: "Gestion de stock · outil interne",
    summary:
      "Plateforme de gestion de stock qui accompagne la boutique Vitrine Déco, construite en Clean Architecture avec NestJS.",
    highlights: [
      "Clean Architecture : domaine métier isolé de l'infrastructure",
      "Authentification et contrôle d'accès par JWT",
      "CI/CD avec des workflows GitHub Actions et des images Docker",
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL", "JWT", "Docker", "GitHub Actions"],
  },
];

export const stack = [
  { group: "Backend", items: ["Node.js", "NestJS", "Express.js", "TypeScript", "JavaScript"] },
  { group: "Bases de données", items: ["PostgreSQL", "MongoDB", "Prisma ORM"] },
  { group: "Messaging & Cache", items: ["Redis", "BullMQ", "Kafka"] },
  {
    group: "Cloud & DevOps",
    items: ["Docker", "Kubernetes (K3s)", "Argo CD", "GitHub Actions", "Nginx", "Traefik", "Linux", "AWS"],
  },
  {
    group: "Paiements",
    items: ["Stripe", "PayPal", "Orange Money", "MTN Money", "Wave", "Moov Money"],
  },
  { group: "Logistique", items: ["UPS", "USPS", "Shippo"] },
  {
    group: "API & Architecture",
    items: ["REST", "Microservices", "Clean Architecture", "JWT", "OAuth2", "Webhooks"],
  },
  { group: "Frontend", items: ["React", "React Native", "Next.js", "Tailwind CSS"] },
  {
    group: "Outils & Méthodes",
    items: ["Git", "GitHub", "GitLab", "Postman", "Bruno", "Swagger", "Notion", "Scrum / Agile"],
  },
];

export const education = [
  {
    degree: "Master Système Informatique & Génie Logiciel (SIGL)",
    school: "UICI",
    period: "2022 — 2024",
  },
  {
    degree: "Licence pro Informatique & Sciences du Numérique",
    school: "Spécialité développement d'applications",
    period: "2019 — 2022",
  },
  {
    degree: "Baccalauréat série D",
    school: "Lycée Charles Bauza Donwahi, Soubré",
    period: "2019",
  },
];
