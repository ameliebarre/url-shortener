# short.ly

Raccourcisseur d'URL full-stack : API Node/Express/TypeScript + frontend React, en monorepo npm workspaces.

## Stack

- **Backend** (`apps/api`) — Express, TypeScript, Drizzle ORM, PostgreSQL, Zod, JWT
- **Frontend** (`apps/web`) — React 19, Vite, TypeScript, TanStack Query, React Router, Tailwind CSS v4

## Prérequis

- Node **22.13.0** (voir `.nvmrc` — `nvm use`)
- Une base **PostgreSQL** accessible (locale ou distante)

## Installation

```bash
npm install
```

Un seul `npm install` à la racine installe les dépendances des deux workspaces (`apps/api` et `apps/web`).

## Configuration

Créer un fichier `apps/api/.env` avec au minimum :

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/urlshortener
JWT_SECRET=une-chaine-secrete-longue-et-aleatoire
```

Variables optionnelles (valeurs par défaut entre parenthèses) :

| Variable | Défaut | Description |
|---|---|---|
| `PORT` | `8000` | Port d'écoute de l'API |
| `FRONTEND_URL` | `http://localhost:5173` | Origine autorisée par CORS |
| `JWT_EXPIRES_IN_SECONDS` | `7200` (2h) | Durée de vie du token d'accès |
| `REFRESH_TOKEN_EXPIRES_IN_SECONDS` | `2592000` (30j) | Durée de vie du refresh token |

Côté frontend, aucune configuration n'est requise en local (l'API est appelée sur `http://localhost:8000` par défaut). Pour pointer vers une autre URL, définir `VITE_API_URL` dans `apps/web/.env`.

## Base de données

Le schéma est défini dans `apps/api/models/` et géré par Drizzle Kit.

```bash
npm run db:push -w api     # applique le schéma sur la base pointée par DATABASE_URL
npm run db:studio -w api   # ouvre Drizzle Studio pour inspecter les données
```

## Lancer le projet

Dans deux terminaux séparés :

```bash
npm run dev:api   # API sur http://localhost:8000
npm run dev:web   # frontend sur http://localhost:5173
```

## Build production

```bash
npm run build:api
npm run build:web
```

L'API compile dans `apps/api/dist` (`npm run start -w api` pour la lancer). Le frontend build dans `apps/web/dist` (fichiers statiques).

## Structure du backend

```
apps/api/
  routes/       HTTP : validation, appel des services, formatage de la réponse
  services/     logique métier + requêtes Drizzle
  models/       schéma des tables (source de vérité SQL)
  middlewares/  auth (JWT), rate limiting, gestion d'erreurs centralisée
  validation/   schémas Zod (body/query/params)
  utils/        JWT, hashing, helpers d'erreurs
```

Chaque route délègue à un service ; les services sont la seule couche à parler à la base (pas de couche repository séparée). `authenticationMiddleware` est global et non bloquant (décode le JWT s'il est présent) ; `ensureAuthenticated` protège route par route ce qui doit l'être.

## API

Toutes les routes sous `/auth` sont protégées par un rate limiter dédié (20 req/15min).

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/signup` | non | Créer un compte |
| POST | `/auth/login` | non | Se connecter, retourne `token` + `refreshToken` |
| POST | `/auth/refresh` | non (refresh token) | Renouvelle `token`/`refreshToken` (rotation à usage unique) |
| GET | `/auth/me` | oui | Infos de l'utilisateur connecté |
| POST | `/auth/logout` | oui | Révoque le token courant + tous les refresh tokens |
| POST | `/shorten` | optionnelle | Crée un lien court (code personnalisé et expiration optionnels) |
| GET | `/codes` | oui | Liste paginée des liens de l'utilisateur (`?page=&pageSize=`) |
| PATCH | `/:id` | oui | Modifie un lien (propriétaire uniquement) |
| DELETE | `/:id` | oui | Supprime un lien (propriétaire uniquement) |
| GET | `/:shortcode` | non | Redirige vers l'URL cible |

Les erreurs suivent un format unifié : `{ "error": { "message": "...", "fieldErrors": { ... } } }` (`fieldErrors` uniquement sur les erreurs de validation).

## Sessions

Token d'accès JWT (2h) + refresh token longue durée (30j, à usage unique, rotation à chaque `/auth/refresh`). Le frontend rafraîchit silencieusement le token d'accès en cas de 401, sans déconnecter l'utilisateur.

## Scripts utiles

| Commande | Description |
|---|---|
| `npm run dev:api` / `dev:web` | Lance l'API / le frontend en mode dev |
| `npm run build:api` / `build:web` | Build de production |
| `npm run lint` | ESLint sur tout le monorepo |
| `npm run format` | Prettier sur tout le monorepo |

## Branches

- `main` — backend
- `frontend` — travail frontend, construit par-dessus le backend de `main`
