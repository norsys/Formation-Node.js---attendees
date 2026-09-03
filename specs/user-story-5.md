# User story 05 : consommer du stock

> En tant que consommateur, je veux diminuer le stock d'un produit afin d'enregistrer son utilisation.

## Criteres d'acceptation

- `PATCH /products/:productReference/use?quantity=3` retourne `200` si le stock le permet ;
- une quantite invalide retourne `400` ;
- un produit absent retourne `404` ;
- un stock insuffisant retourne `422` ;
- un echec metier ne modifie pas les donnees persistees.