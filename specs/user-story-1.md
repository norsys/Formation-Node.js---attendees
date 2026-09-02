# User story 01 : consulter un produit

> En tant qu'utilisateur de la CLI, je veux saisir un identifiant produit afin de consulter ses informations de stock.

Le resultat affiche : identifiant, description, stock et date de mise a jour.

# Criteres d'acceptation

- le catalogue JSON est utilise comme source de donnees ;
- un produit trouve est affiche par la CLI ;
- un identifiant absent produit un message explicite ;
- une entree vide ou invalide est refusee ;
- la CLI ne lit pas directement le fichier JSON.