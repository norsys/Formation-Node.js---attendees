# User story 02 : lister les produits

> En tant que consommateur, je veux obtenir les references produit afin de choisir celui a consulter.

## Criteres d'acceptation

- `GET /products` retourne `200` ;
- le corps est un tableau JSON ;
- chaque element contient `reference` et `description` ;
- la reponse n'expose pas de champs internes inutiles.