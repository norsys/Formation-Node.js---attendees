# User story 06 : valider le contrat HTTP

> En tant que consommateur, je veux recevoir des erreurs de requete coherentes afin de corriger mon appel sans connaitre l'implementation interne.

## Criteres d'acceptation

- params et query string sont controles ;
- `quantity` est obligatoire, entiere et positive ;
- les reponses nominales respectent les formes annoncees ;
- les erreurs de validation retournent `400` avec `{ reason }`.