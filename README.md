# API de Gestion de Véhicules

API RESTful pour la gestion d'une flotte de véhicules développée avec Node.js, Express et MongoDB, déployée sur Netlify.

## 🚀 Technologies Utilisées

- Node.js
- Express.js
- MongoDB Atlas
- Swagger (Documentation API)
- Pino (Logging)
- Netlify (Hébergement Serverless)

## 📋 Prérequis

- Node.js (v18)
- MongoDB Atlas
- Compte Netlify
- npm ou yarn

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
```

3. Configurer les variables d'environnement :
Créer un fichier `.env` à la racine du projet :
```env
MONGODB_URI=votre_uri_mongodb
```

4. Démarrer le serveur en développement :
```bash
npm start
```

### Déploiement sur Netlify

1. Installer Netlify CLI :
```bash
npm install netlify-cli
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

5. Déployer :
```bash
npm run deploy
```

## 📚 Documentation API

La documentation Swagger est disponible aux adresses :
- Local : `http://localhost:3000/api-docs`
- Production : `https://api-vehicles-nodejs.netlify.app/api-docs`

### Points d'entrée principaux :

- GET `/vehicules` - Liste tous les véhicules
- GET `/vehicule/:id` - Récupère un véhicule par son ID
- POST `/vehicule` - Crée un nouveau véhicule
- PUT `/vehicule/:id` - Met à jour un véhicule
- DELETE `/vehicule/:id` - Supprime un véhicule
- GET `/vehicule/search/:licensePlate` - Recherche par plaque d'immatriculation
- GET `/vehicule/price/:max` - Filtre les véhicules par prix maximum

## 🔍 Structure du Projet

```
nodejs-api-vehicules/
├── netlify/
│   └── functions/
│       └── api.js
├── controllers/
│   └── vehiculeController.js
├── models/
│   └── vehiculeModel.js
├── routes/
│   └── vehicules/
├── public/
├── app.js
├── swagger.js
└── netlify.toml
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

## 🔒 Gestion des Erreurs

L'API utilise les codes HTTP standards et un système de logging avec Pino :
- 200 : Succès
- 201 : Création réussie
- 400 : Requête invalide
- 404 : Ressource non trouvée
- 500 : Erreur serveur

## 🧪 Tests

Pour lancer les tests :
```bash
npm test
```

Pour le mode watch :
```bash
npm run test:watch
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
