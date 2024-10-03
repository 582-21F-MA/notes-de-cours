# Cadre de test

Malheureusement, JavaScript n'inclut pas de cadre de test natif. Il
existe plusieurs bibliothèques qui permettent de faciliter l'écriture de
tests : Jest, Mocha, Vitest, etc. Ces bibliothèques doivent être
installées et configurées avant de pouvoir être utilisées. De plus, la
plupart d'elles ne fonctionnent pas dans le navigateur, et requièrent
que les tests soient écrits dans des fichiers séparés. Pour ces raisons,
nous utiliseront un cadre de test spécifique au cours. L'interface de
celui-ci est toutefois identique aux cadres de test mentionnés ci-haut.

## Importer le cadre

Pour utiliser la cadre de test, il faut d'abord l'importer. Au début du
programme à tester, ajoutez les deux lignes suivantes :

```ts
// @ts-ignore
import { test, expect } from "https://maxime-pigeon.github.io/t/test.js";
```

Le commentaire qui précède l'import indique au transcompilateur
d'ignorer les erreurs à la ligne suivante (TypeScript ne supporte pas
très bien les imports dont l'adresse est une URL).

## Utilisation

Pour créer un test, on utilise la fonction `test`, laquelle prend deux
arguments : une chaîne de caractères qui contient le nom du test, puis
une fonction de rappel. Dans le corps de la fonction de rappel, on
utilise la fonction `expect` pour spécifier la valeur actuelle, et la
méthode `toBe` pour spécifier la valeur attendue.

```ts
test("calculer la somme", () => expect(add(1, 2)).toBe(3));
```

Au besoin, on peut définir des variables dans la fonction de rappel.

```ts
test("calculer la différence", () => {
    const actual = substract(2, 1);
    const expected = 1;
    expect(actual).toBe(expected);
});
```

Si le test échoue, un message d'erreur sera écrit soit dans le terminal
soit dans la console du navigateur.
