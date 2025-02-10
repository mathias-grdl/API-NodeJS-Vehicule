# API de Gestion de Véhicules

API RESTful pour la gestion d'une flotte de véhicules développée avec Node.js, Express et MongoDB.

## 🚀 Technologies Utilisées

- Node.js
- Express.js
- MongoDB
- Swagger (Documentation API)
- Pino (Logging)

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

## 🛠️ Installation

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

4. Démarrer le serveur :
```bash
npm start
```

## 📚 Documentation API

La documentation Swagger est disponible à l'adresse : `http://localhost:3000/api-docs`

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
├── config/
│   └── db.js
├── controllers/
│   └── vehiculeController.js
├── models/
│   └── vehiculeModel.js
├── routes/
│   └── vehicules/
├── app.js
├── index.js
└── swagger.js
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

L'API utilise les codes HTTP standards :
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

## 📜 Licence

MIT

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.
