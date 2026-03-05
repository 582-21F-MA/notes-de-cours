# Valeurs

Un programme JavaScript est une suite de **commandes** (_statement_, en
anglais) données à l'ordinateur. La plupart de ces commandes sont faites
d'**expressions**, lesquelles ont une **valeur**. Considérons par
exemple le code suivant:

```js
const sum = 1 + 2;
```

Cette ligne comprend une commande et trois expressions. Les nombres
littéraux `1` et `2` sont des expressions dont la valeur respective est
`1` et `2`. L'opération `1 + 2` est une autre expression dont la valeur
est `3`. Enfin, l'affectation `const sum = 1 + 2` est une commande qui
demande à l'ordinateur d'associer l'identifiant `sum` au résultat de
`1 + 2`.

> [!NOTE]
> On dit que l'ordinateur _évalue_ une expression en sa valeur, alors
> qu'il _exécute_ une commande.

Chaque valeur d'un programme joue un rôle différent, déterminé par sont
**type** : nombre (_number_), chaîne de caractères (_string_), booléen
(_boolean_), etc. Ainsi, ont peut mutliplier deux nombres, mais pas deux
chaînes.

En JavaScript, ces types de valeurs sont divisés en deux catégories :
les **primitifs**, et les **objets**. Les primitifs incluent les
nombres, les chaînes, les booléens, et les valeurs indéfinies `null` et
`undefined`. Toutes les autres valeurs sont des objets.

Pour déterminer le type auquel appartient une valeur, on utilise
l'opérateur `typeof`:

```js
console.log(typeof 1); // => "number"
console.log(typeof "abc"); // => "string"
console.log(typeof true); // => "boolean"
console.log(typeof undefined); // => "undefined"
console.log(typeof null); // => "object" (mensonge)
```

> [!NOTE]
> Dans les notes de cours, on utilise la fonction `console.log` pour
> afficher la valeur d'une expression dans la console du navigateur.
> Notez que toutes les expressions ont une valeur, même si vous ne
> l'affichez pas.

## Nombres

Le type `number` comprend les nombres entiers ainsi que les nombres à
virgule flottante.

```js
console.log(typeof 1); // => "number"
console.log(typeof 1.0); // => "number"
```

En plus des opérateurs arithmétiques de base comme `+` pour l'addition
et `*` pour la multiplication, JavaScript offre plusieurs fonctions qui
permettent de manipuler les nombres.

```js
console.log(1 + 2); // => 3
console.log(2 * 5); // => 10
console.log(Math.pow(5)); // => 25
console.log(Math.round(1.25)); // => 1
console.log(Math.max(1, 5, 2)); // => 5
```

Vous trouverez une liste complète sur [MDN][Math].

[Math]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math

## Chaînes de caractères

Les valeurs de type `string` servent à représenter du texte. Une chaîne
est une séquence de caractères entourée soit de guillemets anglais
simples (`'abc'`), soit de guillemets anglais doubles (`"abc"`).

L'opérateur `+` peut être utilisé avec des chaînes, non pas pour
additionner, mais pour _concaténer_ ; c'est-à-dire coller deux chaînes
ensemble:

```js
console.log("con" + "cat" + "e" + "nate"); // => "concatenate"
```

Pour insérer le résultat d'expressions dans une chaîne de caractères, on
utilise les **littéraux de gabarit**, délimités par des accents graves
plutôt que des guillemets. À l'intérieur d'un littéral de gabarit, les
expressions doivent être placées dans des espaces réservés, indiqués par
le signe dollar et des accolades:

```js
console.log(`1 et 2 font ${1 + 2}`); // => "1 et 2 font 3"
```

Lorsque l'interprétateur JavaScript évalue le littéral de gabarit, il
évalue les expressions se trouvant dans les espaces réservés, convertit
celles-ci en chaîne de caractères, puis les insère sur place.

## Booléens

Le type `boolean` inclut seulement deux valeurs : `true` et `false`. Ces
valeurs servent à représenter une information ayant deux états
possibles, comme « oui » et « non », ou « vrai » et « faux ».

Souvent, un booléen est le résultat d'une opération de comparaison. Par
exemple :

```js
console.log(3 > 2); // => true
console.log(3 < 2); // => false
```

Les trois opérateurs logiques `&&` (ET), `||` (OU) et `!` (NON) sont
utilisés pour manipuler les booléens:

```js
// Vrai si l'opérande à gauche ET à droite sont vrais
console.log(true && true); // => true
console.log(true && false); // => false

// Vrai si l'opérande à gauche OU à droite est vrai
console.log(false || true); // => true
console.log(false || false); // => false

// Renverse l'opérande
console.log(!true); // => false
console.log(!false); // => true
```

> [!NOTE]
> Dans l'**opération** `1 + 2`, `+` est un **opérateur**, `1` est
> l'**opérande** de gauche, et `2` l'opérande de droite.

Les opérateurs `&&` et `||` peuvent aussi être utilisés avec des valeurs
qui ne sont pas des booléens. Dans ce cas, les valeurs suivantes sont
considérées comme étant fausses :

- `undefined`
- `null`
- `0`
- `-0`
- `NaN` (_Not a Number_)
- `""`

Toutes les autres valeurs sont considérées comme étant vraies.

### Court-circuit

En JavaScript, les expressions contenant l'opérateur `&&` ou `||` sont
_court-circuitées_ par l'interprétateur. C'est-à-dire que leur
évaluation s'arrête dès que le résultat est connu, et que leur valeur
correspond à celle de l'opérande où l'interprétateur s'arrête.

Considérons les exemples suivants :

```js
console.log(true || false); // => true
console.log(false && true); // => false
```

Pour évaluer l'expression `true || false`, il n'est pas nécessaire de
lire l'opérande à droite puisque seul un des deux opérandes doit être
vrai. Si l'opérande à gauche est vrai, alors le résultat sera toujours
vrai. Pareillement, pour évaluer l'expression `false && true`, il n'est
pas nécessaire de lire l'opérande à droite puisque les deux opérandes
doivent être vrais. Si l'opérande à gauche est faux, alors le résultat
sera toujours faux.

La même règle s'applique lorsque les opérateurs `&&` et `||` sont
utilisés avec des valeurs qui ne sont pas des booléens. Par exemple :

```js
console.log(1 || 0); // => 1
console.log("" && "abc"); // => ""
```

La valeur de `1 || 0` est `1` puisque l'opérande `1` est considéré comme
étant vrai, tandis que la valeur de `"" && "abc"` est `""` puisqu'une
chaîne vide est considérée comme étant fausse.

## Valeurs indéfinies

Les valeurs `null` et `undefined` représentent une absence de valeur
significative. Par exemple, la valeur de l'expression `console.lof` est
`undefined` puisqu'il n'existe pas de fonction portant ce nom:

```js
console.log(console.lof); // => undefined
```

Pareillement, la fonction `prompt`, qui affiche une boîte de dialogue
dans le navigateur, produit `null` lorsque l'utilisateur ou
l'utilisatrice annule le dialogue.

```js
console.log("Entrez votre nom"); // => null (ou l'entrée)
```

La différence entre `null` et `undefined` est surtout sémantique; `null`
indique une absence _intentionnelle_ de valeur, alors que `undefined`
signale un identifiant qui n'est pas affecté à une valeur. Souvent,
lorsqu'un programme produit une erreur liée à `undefined`, c'est souvent
à cause d'une faute de frappe. Assurez-vous donc de bien relire votre
code !

### Opérateur de coalescence des nuls

L'opérateur `??` permet de renvoyer une valeur par défaut si l'opérande
de gauche est une valeur indéfinie. Il fonctionne de manière similaire à
l'opérateur `||`, mais il renvoie l'opérateur de droite seulement si
l'opérateur de gauche est `null` ou `undefined`.

```js
console.log(null ?? "Bob"); // => "Bob"
console.log(undefined ?? 5); // => 5
console.log(false ?? "Jin"); // => "Jin"
console.log("Su" ?? "Aria"); // => "Aria"
```

Il est particulièrement utile avec des fonctions comme `prompt` qui
retournent _parfois_ une valeur indéfinie.
