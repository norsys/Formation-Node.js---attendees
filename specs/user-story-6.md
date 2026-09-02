# User story 06 : exporter par stream

> En tant qu'utilisateur, je veux que l'export reste utilisable pour un catalogue volumineux sans construire le CSV complet en memoire.

Le flux doit terminer avant que la CLI annonce le succes.

# Criteres d'acceptation

- les produits sont transformes un par un ;
- la conversion CSV est isolee dans une transformation ;
- un stream ecrit le fichier de sortie ;
- les erreurs de la chaine sont propagees ;
- l'export attend la fin effective de l'ecriture.