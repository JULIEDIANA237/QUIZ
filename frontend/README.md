# Todo List - Application Fullstack (Frontend & Backend)

## Description

Cette application **Todo List** est une application fullstack avec un front-end et un back-end. Elle permet aux utilisateurs de créer, mettre à jour, supprimer et visualiser des tâches à faire (*todos*). Le projet est basé sur :

- **Frontend** : Un framework JavaScript moderne (React, Vue.js ou Angular).
- **Backend** : Node.js, Express, Sequelize pour la gestion de la base de données MySQL.

### Fonctionnalités

- Créer une tâche
- Visualiser toutes les tâches
- Modifier le statut d'une tâche (terminée ou non)
- Supprimer une tâche

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org) (version 14.x ou plus récente)
- [MySQL](https://www.mysql.com/) (version 8.x ou plus récente)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) pour la gestion des packages

## Installation

### Cloner le dépôt

git clone https://github.com/votre-nom-utilisateur/todo-list.git
cd todo-list

### Allez dans le dossier backend :

cd backend

### Installez les dépendances : 

npm install

### Créez un fichier .env à la racine du dossier backend et configurez les variables d'environnement pour la connexion à la base de données MySQL. Exemple :

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mot_de_passe
DB_NAME=todo_database
DB_PORT=3306

### Configurez Sequelize en initialisant la base de données et les migrations : 

npx sequelize-cli db:migrate

### Lancez le serveur Node.js :

npx ts-node src/server.ts

### Allez dans le dossier frontend :

cd frontend

### Installez les dépendances :

npm install

### Créez un fichier .env dans le dossier frontend et configurez les variables d'environnement nécessaires (par exemple l'URL de l'API backend) :

REACT_APP_API_URL=http://localhost:4000/api

### Lancez l'application frontend :

npm start 

L'application sera disponible sur http://localhost:3000
