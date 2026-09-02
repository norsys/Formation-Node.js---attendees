# Gestion de stock pour un garage

Ce projet est une base d'application Node.js permettant d'administrer un catalogue de produits et leur stock depuis une interface en ligne de commande (CLI).

Il s'agit d'un support pédagogique : le dépôt fournit une première interface CLI, un jeu de données JSON et six spécifications fonctionnelles. Le travail consiste à compléter l'application en respectant les critères d'acceptation décrits dans le dossier [`specs/`](specs/).

## Prérequis

- Node.js avec NPM installés ;
- un terminal ;
- une copie du dépôt sur la branche de travail souhaitée.

La version minimale de Node.js n'est pas imposée par cette branche. Utilisez une version LTS récente compatible avec les modules ES et les API Node.js utilisées par le projet.

## Installation

À la racine du projet, installez les dépendances à partir du fichier de verrouillage :

```bash
npm ci
```

Cette commande installe les dépendances des workspaces déclarés par le projet. Elle doit être exécutée avant le lancement de la CLI ou l'exécution des tests.

## Utilisation de la CLI

Lancez l'interface depuis la racine :

```bash
npm run start:cli
```

Pour relancer automatiquement la CLI après une modification du code :

```bash
npm run dev -w interfaces/cli
```

Le squelette affiche une aide au démarrage et propose le parcours suivant :

1. saisir un identifiant de produit, par exemple `PNEU-001` ;
2. choisir une action ;
3. saisir une quantité pour les actions de stock ;
4. revenir à la saisie du produit avec `b` ou quitter avec `q`.

Les commandes actuellement reconnues sont :

| Commande | Utilisation |
| --- | --- |
| `help` | Affiche l'aide depuis la saisie d'un produit. |
| `q` | Quitte la CLI. |
| `b` | Revient à la saisie du produit depuis le menu des actions. |
| `r` | Sélectionne l'action de réapprovisionnement. |
| `u` | Sélectionne l'action d'utilisation du stock. |

La quantité saisie doit être un entier strictement positif.

> **État actuel du squelette**
>
> La CLI ne lit pas encore le catalogue, ne modifie pas les stocks et ne persiste pas les opérations. Après une action valide, elle affiche `Not implemented yet.`. La commande `export` apparaît dans l'aide initiale, mais n'est pas encore prise en charge.

## Spécifications fonctionnelles

Les fichiers du dossier [`specs/`](specs/) constituent la référence à suivre. Les critères complets d'acceptation sont détaillés dans chaque user story.

| Spécification | Fonctionnalité attendue |
| --- | --- |
| [`user-story-1.md`](specs/user-story-1.md) | Consulter un produit à partir de son identifiant et afficher ses informations. |
| [`user-story-2.md`](specs/user-story-2.md) | Réapprovisionner un produit, mettre à jour sa date et persister le catalogue. |
| [`user-story-3.md`](specs/user-story-3.md) | Utiliser du stock sans jamais le rendre négatif ni écrire en cas d'échec. |
| [`user-story-4.md`](specs/user-story-4.md) | Configurer les chemins du catalogue et de l'export via l'environnement. |
| [`user-story-5.md`](specs/user-story-5.md) | Exporter le catalogue en CSV avec en-tête, échappement et destination configurable. |
| [`user-story-6.md`](specs/user-story-6.md) | Réaliser l'export par stream et attendre la fin effective de l'écriture. |

Points techniques importants définis par les spécifications :

- le catalogue JSON est la source des données ;
- la CLI ne doit pas lire directement le fichier JSON ;
- les chemins doivent être construits avec `node:path` ;
- les erreurs de lecture, d'écriture et de traitement doivent être propagées clairement ;
- l'export CSV doit gérer les virgules, les guillemets et les retours à la ligne ;
- l'export par stream doit transformer et écrire les produits un par un, sans construire tout le CSV en mémoire.

## Données

Le catalogue initial se trouve dans [`data/products.json`](data/products.json). Chaque produit possède la forme suivante :

```json
{
	"id": "PNEU-001",
	"description": "Pneu Michelin 205/55 R16",
	"stock": 10,
	"updatedAt": "2026-06-18T10:00:00.000Z"
}
```

Les champs sont les suivants :

- `id` : identifiant unique du produit ;
- `description` : libellé du produit ;
- `stock` : quantité disponible ;
- `updatedAt` : date de dernière mise à jour au format ISO 8601.

Les opérations valides doivent préserver cette structure. Les tests peuvent utiliser un catalogue temporaire afin de ne pas modifier durablement le jeu de données initial.

## Organisation du projet

```text
.
├── data/
│   └── products.json       # Catalogue initial
├── interfaces/
│   └── cli/
│       ├── package.json    # Scripts et dépendances de la CLI
│       └── src/
│           ├── CLI.js      # Boucle d'interaction avec l'utilisateur
│           └── index.js    # Point d'entrée de l'application
├── specs/                  # User stories et critères d'acceptation
├── package.json            # Workspace et scripts racine
└── package-lock.json       # Versions verrouillées des dépendances
```

Le projet utilise les modules ES (`"type": "module"`). Le point d'entrée charge également la configuration d'environnement avec `dotenv`.

## Tests et validation

La commande racine prévue pour les tests est :

```bash
npm test
```

Elle délègue l'exécution aux workspaces qui possèdent un script `test`. Cette branche ne fournit pas encore de script de test ni de framework de test dans le workspace CLI. Les tests d'évaluation ou ajoutés pendant le développement doivent donc être exécutés selon leur configuration propre.

Avant de considérer une fonctionnalité terminée, vérifiez :

1. les critères d'acceptation de la user story concernée ;
2. les cas nominaux et les erreurs prévues ;
3. la non-modification du fichier source lorsque la règle métier échoue ;
4. la persistance et la propagation des erreurs lorsque la spécification l'exige ;
5. le fonctionnement de la CLI avec `npm run start:cli`.

## Développement

Pour chaque fonctionnalité, partez de la user story correspondante et identifiez la responsabilité de chaque couche. La CLI doit rester un point d'interaction : elle ne doit pas lire directement le fichier JSON. Les règles métier, l'accès aux données et les transformations d'export doivent être isolés afin de pouvoir être testés indépendamment de l'interaction avec le terminal.

Ne modifiez pas les critères d'acceptation pour adapter l'implémentation. En cas de doute, utilisez le contenu des fichiers de [`specs/`](specs/) comme contrat fonctionnel et conservez les interfaces déjà exposées par le projet.
