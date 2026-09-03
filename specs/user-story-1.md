# User story 01 : demarrer l'API

> En tant que consommateur, je veux disposer d'une application HTTP demarrable afin d'appeler les routes de gestion de stock.

## Criteres d'acceptation

- la creation de l'application est separee de son demarrage reseau ;
- les routes produits sont accessibles sous `/products` ;
- le port est configurable ;
- une erreur non geree n'est pas silencieuse.