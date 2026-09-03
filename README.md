# Node.js - Exercice : interface HTTP de gestion de stock

## Prérequis

### Node.js

Version 20 minimum requise, idéalement la dernière version LTS.

L'installation via [NVM](https://github.com/nvm-sh/nvm) (macOS/Linux) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) est recommandée plutôt que l'installeur officiel, afin de faciliter la gestion des versions de Node.js :

```
nvm install --lts
nvm use --lts
```

### Git

Voir la [documentation officielle d'installation de Git](https://git-scm.com/downloads).

## Présentation

Cette branche fournit le point de départ d'un exercice de formation JavaScript + Node.js.

L'objectif est d'implémenter une interface HTTP pour le domaine de gestion de stock présent dans [domain](domain). Vous pouvez choisir l'un des frameworks suivants :

- ExpressJS
- KoaJS
- Fastify
- NestJS

Le domaine et l'adaptateur de persistance JSON sont fournis. Votre interface HTTP doit s'appuyer sur ces éléments, sans déplacer les règles métier dans les contrôleurs.

## Contrat de service

Le contrat de service HTTP de référence est fourni dans [interfaces/stock-manager-api.yaml](interfaces/stock-manager-api.yaml). Respectez-le pour les routes, les paramètres, les codes de statut et les schémas de réponse.

## Attendus

- Créer l'application HTTP séparément de son démarrage réseau.
- Rendre le port d'écoute configurable.
- Ajouter les dépendances, scripts de démarrage et scripts de test nécessaires au framework choisi.
- Bonus - Écrire des tests HTTP couvrant les parcours nominaux et les réponses `400`, `404` et `422`.

Les user stories détaillent les critères d'acceptation de l'exercice :

- [User story 1](specs/user-story-1.md)
- [User story 2](specs/user-story-2.md)
- [User story 3](specs/user-story-3.md)
- [User story 4](specs/user-story-4.md)
- [User story 5](specs/user-story-5.md)
- [User story 6](specs/user-story-6.md)
- [User story 7](specs/user-story-7.md)

