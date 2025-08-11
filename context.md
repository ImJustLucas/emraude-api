# Contexte

Vous rejoignez une équipe en charge de développer un serious game multijoueur destiné à la formation professionnelle. Ce jeu intègre des classements, des scores en temps réel, des interactions entre joueurs et une logique de progression par niveau. Le front-end est en React. L'infrastructure cible repose sur Google Cloud + Kubernetes + MongoDB.

## Objectif du cas pratique

Créer un backend minimal mais fonctionnel qui permet de :

1. Authentifier un utilisateur - email + mot de passe
2. Sauvegarder sa progression dans le jeu (niveau, score)
3. Intégrer un système de leaderboard
4. Préparer les fondations pour du multijoueur
5. Exposer le tout via une API RESTful propre - export postman ou swagger

## Livrables attendus

- Projet NestJS structuré
- Modèles Mongoose (User, Progress, Match, Leaderboard)
- API REST documentée via Swagger - NestJS swagger ou postman
- Authentification sécurisée (JWT)
- Scripts de seed (optionnel)
- README clair pour lancement local (Mongo + NestJS)
- Bonus si tests unitaires ou dockerfiles

## Étapes détaillées (à réaliser en 4h maximum)

### 1. Authentification

Créer un module Auth avec :

- Signup
- Login
- JWT avec expiration
- Guard `@UseGuards(JwtAuthGuard)`

### 2. Modèle Utilisateur

Mongoose schema :

- email, hashed password, username
- rôle (admin, joueur), avatarURL (optionnel)

### 3. Progression

Créer un modèle Progress :

- userId
- niveau actuel
- score total
- date de dernière partie

API :

- `GET /progress` → progression de l'utilisateur
- `POST /progress/update` → mise à jour du score et du niveau

### 4. Leaderboard

- Calcul des top joueurs (top 10 par score total)
- Endpoint : `GET /leaderboard/top`

### 5. Préparation multijoueur (structure only)

Modèle Match :

- player1Id, player2Id, state (waiting, playing, finished)
- createdAt, winnerId (nullable)

Endpoints :

- `POST /match/create`
- `GET /match/:id`
- `POST /match/:id/result`

### 6. Swagger et organisation

- Swagger disponible via `/api`
- Modules séparés (auth, users, progress, match, leaderboard)

## Contraintes techniques

- NestJS avec modules séparés
- MongoDB via Mongoose
- JWT sécurisé
- Pas de logique front nécessaire, mais prévoir des routes simples testables par Postman/curl
- Réponses JSON propres

## Bonus (si temps)

- Ajout d'un système de détection de triche
- Dockerfile et docker-compose.yml pour NestJS + Mongo

## Lien du front-end

https://staging.boilerplatev2-2.emeraude.games/
