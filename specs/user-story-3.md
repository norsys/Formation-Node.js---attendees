# User story 03 : consulter un produit

> En tant que consommateur, je veux consulter un produit par sa reference afin de connaitre son stock.

## Criteres d'acceptation

- `GET /products/:productReference` retourne `200` si le produit existe ;
- la reponse contient `reference`, `description`, `stock` et `updatedAt` ;
- une reference absente retourne `404` avec `{ reason }` ;
- une reference invalide retourne `400`.