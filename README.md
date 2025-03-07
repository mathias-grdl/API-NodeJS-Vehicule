# API de Gestion de Véhicules

API RESTful pour la gestion d'une flotte de véhicules développée avec Node.js, Express et MongoDB, déployée sur Netlify.

## 🚀 Technologies Utilisées

- Node.js
- Express.js
- MongoDB Atlas
- Swagger (Documentation API)
- Pino (Logging)
- Netlify (Hébergement Serverless)
- JWT (Authentification)

## 📋 Prérequis

- Node.js (v18+)
- MongoDB Atlas
- Compte Netlify
- npm ou pnpm

## 🛠️ Installation et Déploiement

### Développement Local

1. Cloner le dépôt :
```bash
git clone [url-du-repo]
cd nodejs-api-vehicules
```

2. Installer les dépendances :
```bash
npm install
# ou avec pnpm
pnpm install
```

3. Configurer les variables d'environnement :
Créer un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.exemple` :
```env
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_clé_secrète_pour_jwt
PORT=3000
```

4. Démarrer le serveur en développement :
```bash
npm start
# ou
pnpm start
```

5. L'API est accessible à l'adresse : `http://localhost:3000`

### Déploiement sur Netlify

1. Installer Netlify CLI :
```bash
npm install netlify-cli -g
```

2. Se connecter à Netlify :
```bash
npx netlify login
```

3. Initialiser le projet Netlify :
```bash
npx netlify init
```

4. Configurer les variables d'environnement dans Netlify :
   - Aller dans Site settings > Environment variables
   - Ajouter MONGODB_URI avec votre URL de connexion MongoDB Atlas
   - Ajouter JWT_SECRET pour la sécurité des tokens d'authentification

5. Déployer :
```bash
npm run deploy
# ou
pnpm run deploy
```

## 📚 Documentation API

La documentation Swagger est disponible aux adresses :
- Local : `http://localhost:3000/api-docs`
- Production : `https://api-vehicles-nodejs.netlify.app/api-docs`

### Points d'entrée principaux :

#### Véhicules
- GET `/vehicule` - Liste tous les véhicules
- GET `/vehicule/:id` - Récupère un véhicule par son ID
- POST `/vehicule` - Crée un nouveau véhicule (authentification requise)
- PUT `/vehicule/:id` - Met à jour un véhicule (authentification requise)
- DELETE `/vehicule/:id` - Supprime un véhicule (authentification requise)
- GET `/vehicule/search/:licensePlate` - Recherche par plaque d'immatriculation
- GET `/vehicule/price/:max` - Filtre les véhicules par prix maximum

#### Utilisateurs
- POST `/users/register` - Création d'un compte utilisateur
- POST `/users/login` - Authentification et obtention d'un token JWT

## 🔍 Structure du Projet

```
nodejs-api-vehicules/
├── config/
│   └── db.js                 # Configuration de la base de données
├── controllers/
│   ├── userController.js     # Logique pour les utilisateurs
│   └── vehiculeController.js # Logique pour les véhicules
├── middleware/
│   └── authentification.js   # Middleware d'authentification JWT
├── models/
│   ├── userModel.js          # Schéma utilisateur
│   └── vehiculeModel.js      # Schéma véhicule
├── routes/
│   ├── index.js              # Routeur principal
│   ├── users/                # Routes utilisateur
│   └── vehicules/            # Routes véhicule
├── netlify/
│   └── functions/
│       └── api.js            # Point d'entrée pour Netlify Functions
├── tests/                    # Tests unitaires et d'intégration
├── app.js                    # Configuration Express
├── index.js                  # Point d'entrée de l'application
└── swagger.js                # Configuration Swagger
```

## 📝 Format des Données

### Véhicule

```json
{
  "brand": "string",
  "model": "string",
  "licensePlate": "string",
  "year": "number",
  "rentalPrice": "number"
}
```

### Utilisateur

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

## 🔒 Gestion des Erreurs

L'API utilise les codes HTTP standards et un système de logging avec Pino :
- 200 : Succès
- 201 : Création réussie
- 400 : Requête invalide
- 401 : Non autorisé (authentification requise)
- 403 : Accès refusé (droits insuffisants)
- 404 : Ressource non trouvée
- 500 : Erreur serveur

## 🧪 Tests

Pour lancer les tests :
```bash
npm test
# ou
pnpm test
```

Pour le mode watch :
```bash
npm run test:watch
# ou
pnpm run test:watch
```

## 📜 Licence

MIT

## 🔗 Liens Utiles

- [API en Production](https://api-vehicles-nodejs.netlify.app)
- [Documentation API](https://api-vehicles-nodejs.netlify.app/api-docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Netlify Dashboard](https://app.netlify.com)

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.