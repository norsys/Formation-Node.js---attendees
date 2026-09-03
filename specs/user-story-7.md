# User story 07 : centraliser les erreurs

> En tant que mainteneur, je veux une traduction unique des erreurs afin que toutes les routes repondent de facon coherente.

## Criteres d'acceptation

- les routes ne dupliquent pas le mapping des erreurs ;
- les erreurs metier sont converties en `400`, `404` ou `422` ;
- une erreur inattendue retourne `500` ;
- l'erreur technique est journalisee cote serveur.