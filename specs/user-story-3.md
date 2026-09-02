# User story 03 : utiliser du stock
    
> En tant qu'utilisateur de la CLI, je veux diminuer le stock d'un produit afin de refleter son utilisation.

Le stock ne peut jamais devenir negatif.

# Criteres d'acceptation

- la quantite est un entier strictement positif ;
- le produit doit exister ;
- le stock ne devient jamais negatif ;
- une erreur claire est retournee si le stock est insuffisant ;
- aucune modification n'est ecrite lorsque la regle metier echoue.