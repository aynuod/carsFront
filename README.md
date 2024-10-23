
---

# Cars Frontend (React)

Ce projet est la partie frontend de l'application **Voiture Shop App**, développée avec **React** et Dockerisée pour une mise en production facile. Cette application communique avec un backend Spring Boot et utilise une API REST pour la gestion des voitures.

## Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Node.js**: Version 14 ou plus [Télécharger ici](https://nodejs.org/).
- **npm**: Installé avec Node.js.
- **Docker**: [Télécharger Docker ici](https://www.docker.com/get-started).
- **Git**: Pour cloner le projet.

## Setup et Instructions de Build

### ⚠️ Avertissements Importants

1. **Ports Utilisés**: Le frontend utilise par défaut le port `3000`. Si ce port est déjà utilisé sur votre machine, vous devrez le changer dans le `docker-compose.yml` ou libérer le port.
2. **Node Version**: Ce projet utilise Node.js 14 (via l'image Docker `node:14-alpine`). Assurez-vous que cette version est compatible avec vos outils.

### 1. Cloner le Répertoire

Commencez par cloner le projet depuis GitHub et naviguez dans le dossier du projet :

```bash
git clone https://github.com/aynuod/carsFrontend.git
cd carsFrontend
```

### 2. Structure du Dockerfile

Le Dockerfile fourni est basé sur l'image **node:14-alpine**, une version légère de Node.js idéale pour les environnements de production. Voici le contenu du Dockerfile :

```dockerfile
FROM node:14-alpine as frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Explication du Dockerfile :

- **FROM node:14-alpine** : Utilise une image légère de Node.js version 14.
- **WORKDIR /app** : Définit le répertoire de travail dans le conteneur Docker.
- **COPY package*.json ./** : Copie les fichiers `package.json` et `package-lock.json` dans le conteneur.
- **RUN npm install** : Installe les dépendances du projet définies dans le `package.json`.
- **COPY . .** : Copie le reste des fichiers du projet dans le conteneur.
- **RUN npm run build** : Compile le projet React en fichiers statiques prêts pour la production.
- **EXPOSE 3000** : Expose le port 3000 pour accéder à l'application.
- **CMD ["npm", "start"]** : Lance l'application en mode développement.

### 3. Construire l'Image Docker

Une fois les fichiers prêts, vous pouvez construire l'image Docker pour le frontend. Exécutez la commande suivante depuis la racine du projet :

```bash
docker build -t frontend-react .
```

Cette commande créera une image Docker appelée `frontend-react` basée sur le Dockerfile.

### 4. Lancer les Conteneurs avec Docker Compose

Le projet peut être lancé avec Docker Compose, qui coordonne à la fois le frontend React, le backend Spring Boot, et les autres services (base de données, monitoring, etc.).

Si un fichier `docker-compose.yml` est déjà configuré pour ce projet, exécutez la commande suivante pour démarrer les services :

```bash
docker-compose up -d
```

Si vous n'avez pas de fichier Docker Compose configuré, voici un exemple minimaliste pour exécuter uniquement le frontend :

```yaml
version: '3'
services:
  frontend:
    image: frontend-react
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=production
```

Vous pouvez alors lancer le frontend en exécutant :

```bash
docker-compose up -d frontend
```

### 5. Accéder à l'Application

Une fois le conteneur lancé, vous pouvez accéder à l'application React à l'adresse suivante :

- **URL du frontend**: [http://localhost:3000](http://localhost:3000)

## Développement Local(hors Docker)

### Installation des Dépendances

Si vous travaillez en développement local (hors Docker), vous devez installer les dépendances Node.js avec `npm` :

```bash
npm install
```

### Lancer l'Application en Mode Développement

Pour démarrer l'application en mode développement avec hot-reloading, utilisez la commande suivante :

```bash
npm start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

### Compilation pour la Production

Pour compiler le projet en fichiers statiques prêts pour la production, exécutez :

```bash
npm run build
```

Cela créera un dossier `build/` contenant les fichiers optimisés.

## Gestion des Environnements

### Variables d'Environnement

Les variables d'environnement peuvent être configurées pour les différents environnements (développement, production). Elles sont définies dans le fichier `.env` à la racine du projet. Assurez-vous de configurer correctement les variables telles que l'URL de l'API backend.

Exemple de fichier `.env` :

```
REACT_APP_BACKEND_API_URL=http://localhost:8080/api
```

Cela permet de définir l'URL de l'API backend que le frontend utilise pour les appels HTTP.

## Débogage

Si des problèmes surviennent avec Docker ou l'application, voici quelques commandes utiles pour le débogage :

- **Logs des conteneurs** :
  ```bash
  docker-compose logs frontend
  ```

- **Reconstruction de l'image** :
  ```bash
  docker-compose build frontend
  ```

- **Arrêter et supprimer les conteneurs** :
  ```bash
  docker-compose down
  ```

## Accès à l'API Backend

Le frontend communique avec l'API backend hébergée sur [http://localhost:8080](http://localhost:8080). Assurez-vous que le backend est en cours d'exécution pour éviter des erreurs d'accès aux données dans le frontend.

---

