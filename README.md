# Emraude API

API NestJS pour un serious game: authentification, progression, leaderboard, matchs. Swagger est disponible sur `/api`.

## Démarrage rapide

1. Installer les dépendances

```bash
pnpm install
```

2. Préparer l'environnement

```bash
cp .env.example .env
# Éditer .env si nécessaire
```

3. Lancer MongoDB (au choix)

```bash
# via Docker (recommandé)
pnpm run install:docker
# ou localement (Mongo doit tourner sur mongodb://localhost:27017)
```

4. Démarrer l'API

```bash
# développement (watch)
pnpm run start:dev

# production (build + run)
pnpm run build && pnpm run start:prod
```

- Base URL par défaut: `http://localhost:1337`
- Swagger: `http://localhost:1337/api`

## Variables d'environnement (.env)

- `MONGODB_URI` (ex: `mongodb://localhost:27017/serious-game`)
- `JWT_SECRET` (clé secrète JWT)
- `PORT` (ex: `1337`)
- `NODE_ENV` (ex: `development`)

## Scripts utiles

- `pnpm run start` / `start:dev` / `start:prod`
- `pnpm run build`
- `pnpm run test` / `test:e2e` / `test:cov`
- `pnpm run lint`
- `pnpm run format`

## Endpoints principaux

- Auth: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- Users: `GET /users/:id`
- Progress: `GET /progress`, `POST /progress/update`
- Leaderboard: `GET /leaderboard/top?limit=10`
- Match: `POST /match/create`, `GET /match/:id`, `POST /match/:id/result`
