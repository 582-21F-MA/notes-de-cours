# Modules

Plus un programme croît, plus celui-ci gagne en complexité. Plus un
programme est complexe, plus il est difficile de le modifier et de le
maintenir. C'est pourquoi on dit parfois que la complexité est l'ennemi
juré du ou de la programmeuse.

Il existe plusieurs outils pour dompter la complexité d'un programme.
Séparer celui-ci en fonctions, par exemple, permet d'abstraire des blocs
de code. On peut appeler une fonction sans comprendre ou sans avoir en
tête son implémentation ; il suffit de connaître son *interface*,
c'est-à-dire le nombre et le type de ses paramètres.

Pareillement, un *module* est un morceau de programme que l'on abstrait
dans un fichier. À partir d'un module, on peut *importer* des valeurs
d'un autre module, et ainsi utiliser celui-ci sans avoir à connaître le
code source qu'il contient.

## Exports nommés

Pour pouvoir importer une valeur d'un module, il faut que la valeur
aille été exportée. Pour ce faire, on utilise le mot-clé `export`, suivi
de l'identifiant que l'on désire exporter.

```js
// foo.js

export const name = "foo";
```

Le module `foo.js` ci-dessus, par exemple, exporte la constante `name`,
laquelle a comme valeur la chaine de caractères `"foo"`. On peut
exporter n'importe quel type de valeur : nombre, booléen, objet,
fonction, etc.

Pour importer une valeur, on utilise le mot-clé `import`. 

```js
// bar.js

import { name } from "foo.js";
```

L'identifiant entre les accolades doit correspondre à une des valeurs
exportées par le module dont le chemin suit le mot-clé `from`. Le chemin
peut être relatif, comme c'est le cas ci-dessus, ou absolu à partir de
la racine du site web (`/static/js/foo.js`, par exemple).

Un module peut exporter plus d'une valeur, et plus d'une valeur peut
être importées dans une même instruction `import`.

```js
// foo.js

export const name = "foo";

export function greet(name) {
    return `Bonjour, mon nom est ${name}`;
}
```

```js
// bar.js

import { name, greet } from "foo.js";


const greeting = greet(name);
console.log(greeting); // => "Bonjour, mon nom est foo"
```

## Exports par défaut

Toutes les valeurs exportées dans les exemples précédents sont exportées
avec leur identifiant (`name` et `greet`), lequel doit être utilisé pour
importer celles-ci. Pour chaque module, on peut également définir un (et
un seul) *export par défaut*. Une valeur exportée par défaut n'a pas de
nom prédéfini. Le module ou les modules qui l'importent pourront donc
nommer la valeur comme bon leur semble.

Pour définir un export par défaut, on ajoute le mot-clé `default` après
`export`. Puisque seule la valeur est exportée et non son identifiant,
on peut omettre ce dernier.

```js
// foo.js

export default [1, 2, 3];

export const name = "foo";

export function greet(name) {
    return `Bonjour, mon nom est ${name}`;
}
```

Vous remarquerez qu'un module peut définir un export par défaut en plus
de ses exports nommés.

On importe un export par défaut de la même manière qu'un export nommé, à
la différence que les accolades sont omises.

```js
// bar.js

import numbers, { name, greet } from "foo.js";

console.log(numbers); // => [1, 2, 3]
```

Ci-dessous, on assigne l'identifiant `numbers` au tableau de nombres
exporté par défaut par le module `foo.js`. Notez toutefois qu'on aurait
pu utiliser n'importe quel autre nom.
