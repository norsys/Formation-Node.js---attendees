# User story 08 : tester l'API (bonus)

> En tant que developpeur, je veux des tests HTTP afin de verifier le contrat sans passer par un navigateur.

## Criteres d'acceptation

- les chemins nominaux sont couverts ;
- les statuts `400`, `404` et `422` sont couverts ;
- les corps JSON sont verifies ;
- les donnees de test sont isolees ;
- l'application ferme proprement ses ressources apres les tests.