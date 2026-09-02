# User story 04 : configurer les chemins

> En tant qu'utilisateur du projet, je veux configurer l'emplacement des fichiers sans modifier le code source.

Les chemins du catalogue et de l'export viennent de l'environnement.

# Criteres d'acceptation

- la localisation du catalogue est lue dans `process.env` ;
- une valeur par defaut est documentee ou une erreur claire est levee ;
- les chemins sont construits avec `node:path` ;
- `.env` et `node_modules` ne sont pas versionnes.