# Valeurs, types et opérateurs

En JavaScript, les types de valeur peuvent être divisés en deux grandes
catégories : les primitifs et les objets. 

## Primitifs

La catégorie des types primitifs inclue les nombres (`number`), les
chaînes de caractères (`string`) ainsi que les booléens (`boolean`). La
nullité (`null`) et la valeur indéfinie (`undefined`) font également
partie des types primitifs. Toutes les valeurs de type primitif sont
immuable, c'est-à-dire qu'on ne peut pas les modifier.

### Nombres

Le type `number` est utilisé pour représenter les nombres entiers et les
nombres réels. Un nombre qui apparaît directement dans un programme (et
non en tant que variable) est appelé un « littéral de nombre ».

En plus des opérateurs arithmétiques de base (addition `+`, soustraction
`-`, multiplication `*`, division `/`, modulo `%`, etc.), JavaScript
supporte plusieurs opérations mathématique accessibles en tant que
méthodes de l'objet natif `Math`.

```ts
Math.pow(2,53)
Math.round(.6)
Math.ceil(.6)
Math.floor(.6)
Math.abs(-5)
Math.max(x,y,z)
Math.min(x,y,z)
Math.random()
```

Vous trouverez une liste complète sur [MDN][Math].

[Math]: 
    https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math

### Chaînes de caractères

JavaScript utilise le type `string` (chaîne) pour représenter du texte.
Une chaîne est une séquence immuable de valeurs 16 bits, chacune
représentant un caractère Unicode. La longueur d'une chaîne correspond
donc au nombre de valeurs 16 bits dans celle-ci. La propriété native
`length` a comme valeur la longueur de la chaîne.

```ts
"abc".length; // => 3
```

Notez que, en JavaScript est possible d'itérer directement sur une
chaîne avec la boucle `for...of`.

```ts
for (let letter of "abc") console.log(letter); // => a b c
```

En plus de l'opérateur de concaténation `+`, JavaScript inclut plusieurs
méthodes native pour manipuler les chaînes.

```ts
// Obtenir une sous-chaîne
"abc".slice(1, 3);     // => "bc" : les caractères entre la borne 1 (ouverte) et 3 (fermée)
"abc".slice(-2);       // => "bc" : les 2 derniers caractères
"a bc".split(" ");     // => ["a", "bc"] : diviser une chaîne

// Rechercher
"abc".indexOf("b");     // => 1 : position de la première lettre "b"
"abc".indexOf("b", 2);  // => 1 : position de "b" après l'indice 2
"abc".indexOf("z");     // => -1 : "abc" ne contient pas la sous-chaîne "z"
"abc".lastIndexOf("b"); // => 1 : position de la dernière lettre "b"
"abc".startsWith("a");  // => true : la chaîne commence par "a"
"abc".endsWith("c");    // => true : la chaîne se termine par "c"
"abc".includes("b");    // => true : la chaîne inclut "b"

// Créer des versions modifiées
"abc".replace("bc", "xy"); // => "axy" : remplacer "bc" par "xy"
"ABC".toLowerCase();       // => "abc" : minuscules
"abc".toUpperCase();       // => "ABC" : majuscules

// Ajouter des espaces
"x".padStart(3);      // => "  x" : ajouter des espaces à gauche pour atteindre une longueur de 3
"x".padEnd(3);        // => "x  " : ajouter des espaces à droite pour atteindre une longueur de 3
"x".padStart(3, "*"); // => "**x" : ajouter des étoiles à gauche pour une longueur de 3
"x".padEnd(3, "-");   // => "x--" : ajouter des tirets à droite pour une longueur de 3

// Supprimer des espaces
" abc ".trim();      // => "abc" : supprimer les espaces au début et à la fin
" abc ".trimStart(); // => "abc " : supprimer les espaces à gauche
" abc ".trimEnd();   // => " abc" : supprimer les espaces à droite
```

#### Littéraux de gabarit

Les littéraux de gabarit permettent d'inclure des expression dans une
chaîne de caractère. Les gabarits sont délimités par des accents graves,
tandis que les expressions sont indiquées par un signe dollar et des
accolades. 

```ts
const name = "Bill";
const greeting = `Hi ${name}`; // => "Hi Bill"
```

La valeur d'un littéral de gabarit est obtenu après avoir évalué les
expressions entre accolades, puis converti leur valeur en chaîne de
caractères, puis combiné ces chaînes avec ce qui se trouve en dehors des
accolades.

### Booléens

Seules deux valeurs sont de type `boolean` : `true` (vrai) et `false`
(faux). Un booléen est généralement le résultat d'une opération de
comparaison.

```ts
"a" === 4; // => false
```

Dans les contextes où un booléen est attendu (notamment, pour la
condition d'une instruction conditionnelle), des valeurs autres que
`true` et `false` peuvent être automatiquement convertis en booléen par
JavaScript. Spécifiquement, toutes les valeurs suivantes sont converties
en `false` :

```ts
undefined
null
0
-0
NaN // Not a Number
""  // Chaîne vide
```

Toutes les autres valeurs sont converties en `true`.

```ts
if ("abc") console.log("Je suis exécuté");
```

### Court-circuit

En JavaScript, les opérateurs logiques `&&` (ET logique) et `||` (OU
logique) peuvent être court-circuités pour obtenir le résultat de
l'expression dont la valeur est `false` (pour le ET logique) ou `vrai`
(pour le OU logique).

Considérons les examples suivants :

```ts
"foo" && ""   // => "" (false)
null || "bar" // => "bar" (true)
```

### Opérateur ternaire conditionnel

L'opérateur ternaire conditionnel est le seul opérateur JavaScript qui
comporte trois opérandes. 

```
condition ? exprSiVrai : exprSiFaux;
```

Le premier opérande est une condition. Le second est une expression qui
est évaluée si la condition est équivalente à `true`. Le dernier
opérande est une expression qui est évaluée si la condition est
équivalent à `false`.

```ts
true ? "Évaluée" : "Ignorée"
false ? "Ignorée" : "Évaluée"
```

On fera attention de ne pas abuser de l'opérateur ternaire conditionnel
car il peut être plus difficile à lire qu'une instruction conditionnel
standard. Il est préférable d'utiliser une instruction `if` si le code
s'étend sur plusieurs lignes.

### `null` et `undefined`

Le mot-clé `null` indique l'absence *intentionnelle* de valeur. Par
contraste, `undefined` est la valeur d'une variable qui n'a pas encore
été initialisée, ou d'une propriété qui n'existe pas. En TypeScript, on
rencontre rarement la valeur `undefined`, tandis que `null` est
fréquemment utilisé, notamment pour indiquer qu'un paramètre est
facultatif.

```ts
function greet(name: string | null): string {
    if (!name) return `Hi!`;
    return `Hi ${name}!`
}

greet(); // La valeur de l'argument « name » est « null ».
```

## Objets

Toute valeur qui n'appartient pas à un des types primitifs est un objet.
Un objet est un ensemble de propriétés, chacune ayant un nom (aussi
appelé « clé ») et une valeur. Un objet est muable, c'est-à-dire qu'on
peut modifier ses propriétés après que l'objet aille été créé.

Un tableau (`array`) un type spécial d'objet, tout comme le sont les
fonctions. On en déduit donc que les fonctions sont des valeurs, tout
comme les tableaux, les nombres, les chaînes, etc. Nous reparlerons des
fonctions comme valeurs et des objets plus tard.


