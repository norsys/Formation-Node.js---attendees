# User story 04 : reapprovisionner un produit

> En tant que consommateur, je veux augmenter le stock d'un produit afin d'enregistrer une reception.

## Criteres d'acceptation

- `PATCH /products/:productReference/restock?quantity=3` retourne `200` ;
- le stock retourne est augmente ;
- la modification est persistee ;
- une quantite invalide retourne `400` ;
- une reference absente retourne `404`.