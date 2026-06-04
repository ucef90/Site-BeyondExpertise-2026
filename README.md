# Beyond Expertise

Socle professionnel pour une plateforme de formation moderne combinant :

- site corporate premium
- catalogue de formations
- tunnel commercial
- espace client
- espace apprenant
- mini LMS intégré

## Stack

- `apps/web` : Next.js, React, TypeScript
- `apps/api` : NestJS, TypeScript
- `prisma` : PostgreSQL + Prisma
- `packages/ui` : design tokens partagés
- `docs` : architecture et spécifications

## Structure du projet

```text
apps/
  api/
  web/
docs/
  architecture/
  functional-spec/
packages/
  config/
  ui/
prisma/
  schema.prisma
  seed.ts
docker-compose.yml
package.json
pnpm-workspace.yaml
turbo.json
```

## Installation

### 1. Pré-requis

- Node.js 20+
- pnpm 10+
- Docker

### 2. Variables d’environnement

Copier `.env.example` vers `.env` puis adapter les secrets si nécessaire.

### 3. Base de données

```bash
docker compose up -d
```

### 4. Dépendances

```bash
pnpm install
```

### 5. Prisma

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

### 6. Lancement

```bash
pnpm dev
```

Le frontend tourne sur `http://localhost:3000` et l’API sur `http://localhost:4000`.

## Commandes utiles

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Fonctionnalités incluses dans ce socle

- page d’accueil premium
- catalogue de formations
- fiche formation détaillée
- pages contact, devis, connexion, inscription
- dashboard client
- page d’entrée LMS
- API NestJS structurée
- schéma Prisma orienté formation + learning

## Choix d’architecture

### Frontend

- App Router Next.js
- composants réutilisables
- design tokens centralisés
- structure prête pour SSR, SEO et pages dynamiques

### Backend

- NestJS modulaire
- validation stricte via DTO
- routes par domaine métier
- intégration Prisma prévue via service global

### Données

Le schéma couvre :

- utilisateurs et rôles
- entreprises
- formateurs
- formations et catégories
- sessions
- inscriptions
- leads et devis
- contenus pédagogiques
- quiz et progression
- certificats

## Évolution prévue

### LMS complet

- lecteur vidéo enrichi
- quiz chronométrés
- badges et scoring
- reporting détaillé
- certificats avancés

### Multi-tenant SaaS

- ajout d’un `tenant_id`
- isolation des catalogues
- branding par client
- administration par organisation

### Portail entreprises

- gestion de responsables RH
- inscriptions multi-participants
- suivi de consommation
- documents et facturation

### Paiement en ligne

- Stripe Checkout
- paiements B2C et B2B
- coupons
- factures et avoirs

### Certification avancée

- règles d’éligibilité
- vérification publique des certificats
- génération PDF signée

## Limites actuelles du socle

- les formulaires frontend ne sont pas encore branchés à l’API
- l’authentification est posée en base mais reste en mode démonstration
- l’admin n’est pas encore implémentée côté interface
- le LMS est structuré côté données, avec UI encore minimale

## Documents complémentaires

- [Vue d’ensemble architecture](docs/architecture/overview.md)
- [Arborescence fonctionnelle](docs/functional-spec/site-map.md)
- [Routes API](docs/architecture/api-routes.md)
