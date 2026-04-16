# Collections

La plupart des données sur le Web prennent la forme de **collections** :
pensons à un catalogue de produits, ou une grille d'images. Pour
représenter ces collections, JavaScript offre plusieurs types d'objet,
chacun avec ses propriétés propres. Nous abordons ici les plus
importants, mais notez qu'il en existe plusieurs autres.

## Tableaux

Les objets de type `Array` (**tableau**, en français) permettent de
stocker une séquence de valeurs ordonnées auxquelles on peut accéder à
l'aide d'un **indice** numérique.

Pour créer un tableau, on utilise soit le constructeur `Array`, soit un
littéral de tableau :

```js
const numbers = new Array(1, 2, 3);
const letters = ["a", "b", "c"];
```

> [!NOTE]
> Les valeurs d'un tableau peuvent être de types différents, mais il est
> plus courant qu'un tableau contienne des valeurs du même type.

Pour accéder à un élément du tableau, on utilise l'opérateur d'accès
`[indice]` où `indice` est une expression dont la valeur correspond à la
position de l'élément dans le tableau. En JavaScript, les éléments sont
indexés à partir de 0. Le premier élément a donc l'indice 0, le deuxième
l'indice 1, et ainsi de suite :

```js
console.log(numbers[0]); // => 1
console.log(letters[1]); // => "b"
```

L'indice donné à l'opérateur `[]` doit être un nombre entier positif.
Pour accéder à un élément à partir de la fin du tableau, on utilise
plutôt la méthode `at` :

```js
console.log(numbers.at(-1)); // => 3
console.log(letters.at(-2)); // => "b"
```

Une position négative est comptée à partir de la fin du tableau. La
position `-1` fait donc référence au dernier élément, `-2` à
l'avant-dernier, et ainsi de suite :

```
["a", "b", "c"]
  |    |    |
  0    1    2
 -3   -2   -1
```

Les tableaux étant des objets, il est possible de modifier leurs
valeurs. Ainsi, l'opérateur `[]` peut être utilisé non seulement pour
accéder à un élément du tableau, mais aussi pour changer un de ses
éléments :

```js
letters[0] = "à";
console.log(letters); // => ["à", "b", "c"]
```

Pareillement, les fonctions `push`, `pop`, `unshift` et `shift` sont des
méthodes de mutation qui modifient le tableau sur lequel elles sont
appelées. Dans l'exemple ci-dessous, vous noterez que `numbers` n'est
jamais réaffectée ; c'est un seul et même tableau qui change dans le
temps.

```js
console.log(numbers); // => [1, 2, 3]

// push : ajoute un élément à la fin du tableau
numbers.push(4);
console.log(numbers); // => [1, 2, 3, 4]

// pop : retire le dernier élément du tableau
numbers.pop();
console.log(numbers); // => [1, 2, 3]

// unshift : ajoute un élément au début du tableau
numbers.unshift(0);
console.log(numbers); // => [0, 1, 2, 3]

// shift : retire le premier élément du tableau
numbers.shift();
console.log(numbers); // => [1, 2, 3]
```

### Mutation d'arguments

On se rappelle que les objets sont manipulés par _référence_,
contrairement aux valeurs primitives qui le sont par leur _valeur_.
Lorsqu'on applique une fonction sur un nombre, par exemple, il est
impossible de modifier ce nombre :

```js
/**
 * Does nothing.
 * @param {number} num
 */
function increment(num) {
    num = num + 1;
}

let foo = 1;
increment(foo);

console.log(foo); // => 1
```

Dans le code ci-dessus, on ne passe pas la variable `foo` à la fonction
`increment`. On passe plutôt sa valeur, qui est `1`. La commande
`num = num + 1` réaffecte `num`, mais elle ne change pas la valeur de
`foo`. Le `1` de `foo` et le `1` de `num` sont des valeurs différentes.

Par contraste, il est possible pour une fonction de modifier un objet
passé comme argument :

```js
/**
 * Adds 1 to the given numbers array.
 * @param {Array<number>} nums
 */
function add(nums) {
    nums.push(1);
}

const bar = [1, 2];
add(bar);

console.log(bar); // => [1, 2, 1]
```

Ici, `nums` et `bar` font référence au même objet en mémoire. C'est
pourquoi appeler `push` sur `nums` modifie également `bar`.

> [!NOTE]
> Dans le commentaire de documentation ci-dessus, le type du paramètre
> `nums` est `Array<number>` car c'est un objet de type `Array` qui
> contient des valeurs de type `number`. On peut lire les chevrons
> `<...>` comme « de ». Ainsi, le type `Array<string>` se lit « tableau
> _de_ chaînes ». Les formes `number[]` et `string[]` sont aussi
> acceptées.

Quoique possible, on évite généralement de modifier un objet reçu comme
argument. Si toutes les fonctions auxquelles on passe notre objet
peuvent modifier celui-ci à notre insu, le code devient difficile à
déboguer. Pour comprendre l'évolution d'un seul objet au fil du
programme, il faudrait lire l'implémentation de toutes les fonctions qui
y touchent.

Pour cette raison, si on doit manipuler un objet passé comme argument,
mieux vaut en faire une copie :

```js
/**
 * Adds 1 to the given numbers array.
 * @param {Array<number>} nums
 * @returns {Array<number>}
 */
function add(nums) {
    const copy = Array.from(nums);
    copy.push(1);
    return copy;
}

expect(add([])).toEqual([1]);
expect(add([1])).toEqual([1, 1]);

const bar = [1, 2];
const bar2 = add(bar);

console.log(bar); // => [1, 2]
console.log(bar2); // => [1, 2, 1]
```

Cette deuxième version de `add` ne modifie ni `nums`, ni `bar`. Plutôt,
une copie de `nums` est créée avec la fonction `Array.from`. La copie
est ensuite modifiée et retournée par la fonction.

> [!NOTE]
> Vous remarquerez que faire une copie et modifier celle-ci nous oblige
> à retourner une valeur, ce qui rend la fonction plus facile à tester.

Alternativement, on peut utiliser des méthodes sans mutation comme
`slice` et `concat` :

```js
// slice : renvoie une copie d'une portion du tableau
console.log([1, 2, 3].slice(-1)); // => [3];
console.log([1, 2, 3].slice(1)); // => [2, 3];

// concat : concatène deux tableaux
console.log([1, 2].concat([3])); // => [1, 2, 3];
console.log([1].concat([2, 3])); // => [1, 2, 3];
```

Ces méthodes font automatiquement une copie du tableau sur lequel elles
sont appelées, ce qui nous évite d'avoir à le faire manuellement. Voici
par exemple une troisième version de `add` qui remplace `push` par
`concat` :

```js
function add(nums) {
    return nums.concat([1]);
}
```

## Tableaux associatifs

Les objets de type `Map` (**tableau associatif** ou **dictionnaire**, en
français) permettent de stocker des paires de clé-valeur. Ils sont
particulièrement utiles lorsqu'on doit régulièrement ajouter et
supprimer des paires, ce qu'il est déconseillé de faire avec les
littéraux d'objet. De plus, n'importe quel type de valeur peut être
utilisé comme clé.

Pour créer un tableau associatif, on utilise le constructeur `Map`
auquel on donne comme argument un tableau dont les éléments sont des
tableaux contenant une clé et une valeur. Le tableau associatif
`grades`, par exemple, associe un élève à sa note :

```js
const grades = new Map([
    ["Bob", 75],
    ["Momo", 95],
]);
console.log(grades); // => Map {"Bob" => 75, "Momo" => 95}
```

On utilise les méthodes `get`, `set` et `delete` pour extraire, ajouter
et supprimer une paire :

```js
console.log(grades.get("Bob")); // => 75

grades.set("Jin", 60);
console.log(grades); // => Map {"Bob" => 75, "Momo" => 95, "Jin" => 60}

grades.delete("Momo");
console.log(grades); // => Map {"Bob" => 75, "Jin" => 60}
```

Contrairement aux tableaux, il n'existe pas de méthodes sans mutation
comme `slice` et `concat` pour les tableaux associatifs. Si notre
fonction doit modifier un tableau associatif passé comme argument, on
copie d'abord celui-ci à l'aide du constructeur `Map` :

```js
/**
 * Add the given grade to the grades Map.
 * @param {Map<string, number>} grades
 * @param {string} name
 * @param {number} grade
 * @returns {Map<string, number>}
 */
function addGrade(grades, name, grade) {
    const copy = new Map(grades);
    copy.set(name, grade);
    return copy;
}

expect(addGrade(new Map(), "Bob", 75)).toEqual(new Map([["Bob", 75]]));
expect(addGrade(new Map([["Bob", 75]]), "Momo", 95))
    .toEqual(new Map([["Bob", 75], ["Momo", 95]]));
```

> [!NOTE]
> Dans le commentaire de documentation ci-dessus, le type du paramètre
> `grades` est `Map<string, number>` car c'est un objet de type `Map`
> avec des clés de type `string` et des valeurs de type `number`.

## Comparaison

Comment choisir entre un objet, un tableau, et un tableau associatif ?
Voici quelques pistes pour vous aider :

- L'ordre des valeurs est important (comme pour une liste de tâches) →
  **tableau**
- On doit filtrer ou ordonner les éléments → **tableau**
- On doit ajouter ou supprimer des paires dynamiquement (comme pour un
  inventaire) → **tableau associatif**
- On doit régulièrement extraire une valeur selon son identifiant (comme
  pour un annuaire téléphonique) → **tableau associatif**
- Les clés ne sont pas des chaînes de caractères → **tableau
  associatif**
- On a des paires avec des valeurs de types différents (comme pour un
  compte bancaire) → **objet**
- Les clés sont fixes et connues à l'avance → **objet**
- Chaque valeur a une signification distincte (comme les coordonnées x
  et y d'un point) → **objet**
