# User story 05 : exporter le catalogue en CSV

> En tant qu'utilisateur de la CLI, je veux exporter le catalogue dans un fichier CSV afin de l'ouvrir dans un tableur.

La commande `export` produit un fichier avec une ligne d'en-tete.


# Criteres d'acceptation

- le fichier contient une ligne d'en-tete ;
- chaque produit produit une ligne CSV ;
- le dossier destination est cree si necessaire ;
- la destination est configurable ;
- les erreurs d'ecriture sont remontees ;
- virgules, guillemets et retours a la ligne sont echappes.