# Exercices JavaScript modernes avec Node.js

Cette branche contient des exercices de JavaScript moderne. Chaque exercice est
défini par un fichier de test exécutable avec le test runner natif de Node.js.
Votre objectif est d'implémenter les modules attendus pour faire passer tous les
tests.

Aucune dépendance npm n'est nécessaire.

## Prérequis

Installez Node.js 20 ou une version plus récente. Cette version fournit le test
runner et le support des modules ECMAScript nécessaires aux exercices.

Vérifiez l'installation :

```sh
node --version
```

## Exécuter les tests

Depuis ce répertoire, exécutez toute la suite :

```sh
node --test
```

Pour vous concentrer sur un exercice, ciblez son fichier de test :

```sh
node --test fundamentals-01-sum.test.js
```

Un test qui échoue fait partie du parcours normal. Lisez le message d'erreur,
ajustez votre implémentation, puis relancez le test ciblé. Exécutez la suite
complète avant de considérer votre travail terminé.

## Résoudre un exercice

Les tests constituent la spécification. Pour chaque fichier `*.test.js` :

1. Lisez le test pour identifier le comportement attendu, les cas limites et
	 le nom des exports.
2. Créez le fichier de solution à côté du test, avec le même nom sans
	 `.test`. Par exemple, le test
	 `fundamentals-01-sum.test.js` attend
	 `fundamentals-01-sum.js`.
3. Exportez les fonctions demandées en utilisant des exports nommés.
4. Lancez le test ciblé, puis la suite complète lorsque l'exercice est vert.

Exemple de structure pour le premier exercice :

```js
// fundamentals-01-sum.js
export function sum(values) {
	// Votre implémentation
}

export function sum2(...values) {
	// Votre implémentation
}
```

Les noms de fichiers et d'exports font partie du contrat. Un export par défaut
ne remplace pas un export nommé attendu par le test.

Ne modifiez pas les fichiers `*.test.js` pour faire passer les tests : ils
décrivent le comportement à implémenter.

## Parcours

Les exercices sont indépendants et peuvent être résolus dans l'ordre indiqué.

| Thème | Exercices |
| --- | --- |
| Fondamentaux | `fundamentals-01-sum` : tableaux et paramètres rest |
| JavaScript moderne | `modern-js-01` à `modern-js-03` : destructuration, optional chaining, valeurs par défaut et opérateurs d'affectation logique |
| Spread et immutabilité | `spread-object-01` à `spread-object-06` : copie superficielle, copies ciblées, tableaux, objets imbriqués et fusion de configuration |
| Event loop | `event-loop-01` à `event-loop-02` : ordre d'exécution, promesses, événements, timeout et nettoyage des listeners |
| Contrôle asynchrone | `async-control-01` à `async-control-09` : normalisation sync/async, timeout, séquence, concurrence, retry, résultats, annulation et composition |
| Interop callback/Promise | `async-interop-01` : adaptation d'un callback error-first en Promise |

## Points d'attention

Certains tests vérifient davantage que la valeur retournée. Gardez notamment
ces contraintes en tête :

- Préservez les objets reçus lorsque le test attend une opération immuable.
- Distinguez les valeurs absentes des valeurs falsy comme `0`, `false` ou une
	chaîne vide ; les opérateurs `||`, `??`, `||=` et `??=` n'ont pas la même
	sémantique.
- Une exécution concurrente doit respecter la limite demandée tout en
	préservant, lorsque le test l'exige, l'ordre des résultats.
- Nettoyez les timers et les listeners d'événements après succès, erreur ou
	timeout.
- Respectez une annulation déjà demandée via `AbortSignal`, ainsi que le nombre
	total de tentatives lors d'un retry.
- Lors d'une conversion callback/Promise, ne retenez que le premier appel du
	callback.

Bon travail.
