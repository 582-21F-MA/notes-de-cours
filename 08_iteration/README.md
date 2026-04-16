# Itération

**Itérer** est l'acte de répéter une opération un certain nombre de
fois. Le plus souvent, cela veut dire parcourir une collection de
valeurs, et exécuter une série d'opérations sur chacune d'elles. Pour ce
faire, JavaScript offre deux types de constructions :

- les **boucles** telles que `for` et `for..of`,
- et les **fonctions d'ordre supérieur** telles que `filter`, `map`,
  `every`, `some` et `reduce`.

Dans la plupart des cas, ces constructions sont interchangeables. Cela
dit, les fonctions d'ordre supérieur évitent la mutation, et le code
qu'elles produisent est en général plus concis.

> [!NOTE]
> Même si vous êtes déjà familier·ères avec les boucles, on vous
> conseille fortement de vous pratiquer à utiliser les fonctions d'ordre
> supérieur en JavaScript. Beaucoup de sites Web utilisent [React], une
> bibliothèque de code où vous êtes obligé·es d'utiliser les fonctions
> d'ordre supérieur.

[React]: https://react.dev/

## Boucles

Les boucles sont des commandes qui permettent de répéter une commande ou
un bloc de commandes un certain nombre de fois. En soi, les boucles ne
produisent aucune valeur. Elles sont donc toujours utilisées pour
réaffecter une variable ou modifier un objet.

### For

La boucle `for` permet de répéter une commande ou un bloc tant et aussi
longtemps qu'une condition est vraie. Elle est composée de trois
expressions séparées par des `;` :

1. une expression d'**initialisation** évaluée une seule fois avant la
   première itération,
2. une **condition** évaluée avant chaque itération, et
3. une expression de mise à jour évaluée après chaque itération.

```js
const numbers = [];
for (let i = 1; i < 4; i++) numbers.push(i);
console.log(numbers); // => [1, 2, 3]
```

Dans l'exemple ci-dessus, la commande `numbers.push(i)` est exécutée
tant et aussi longtemps que la valeur de `i` est plus petite que 4. La
variable `i` est utilisée pour compter le nombre d'itérations. C'est
pourquoi sa valeur est incrémentée avec `i++` après chaque itération.

### For of

Pour itérer sur chaque élément d'une collection, on utilise la boucle
`for...of`. Elle prend une des deux formes suivantes, où `<élément>` est
affecté à un élément différent de `<collection>` pour chaque itération :

```
for (const <élément> of <collection>) <commande>

for (const <élément> of <collection>) {
    <commande>  
    <commande>
}
```

Par exemple :

```js
const numbers = [1, 2, 3, 4];
let digits = "";
for (const n of numbers) digits += String(n);
console.log(digits); // => "1234"
```

Ici, la variable `n` est donc déclarée quatre fois : une fois pour
chaque nombre du tableau `numbers`.

> [!NOTE]
> À moins d'avoir besoin de l'index, préférez la boucle `for...of` à la
> boucle `for` pour itérer sur un tableau. Le code qu'elle produit est
> moins complexe, et donc plus facile à lire.

### Continue et break

À l'intérieur des boucles, les mots-clés `continue` et `break`
permettent respectivement de passer à l'itération suivante et de stopper
la boucle :

```js
const numbers = [1, 2, 3, 4];
const evenNumbers = [];

for (const n of numbers) {
    const isEven = n % 2 === 0;
    if (!isEven) continue;
    evenNumbers.push(n);
}

console.log(evenNumbers); // [2, 4]
```

Dans l'exemple ci-dessus, on s'intéresse seulement aux nombres pairs. Si
la valeur de `n` n'est pas paire, alors on passe immédiatement à la
prochaine itération, sans exécuter `evenNumbers.push(n)`.

Le mot-clé `break` fonctionne de façon similaire, mais il arrête la
boucle entière.

## Fonctions d'ordre supérieur

Une fonction d'ordre supérieur est une fonction qui

- soit prend en argument une fonction,
- soit retourne une fonction.

Les fonctions avec lesquelles nous avons travaillé jusqu'à présent
permettaient d'abstraire des _valeurs_. Les fonctions d'ordre supérieur
permettent d'abstraire des _opérations_.

### Filter

Considérons de nouveau le programme précédent qui vérifie à plusieurs
reprises si un nombre est pair :

```js
const numbers = [1, 2, 3, 4];
const evenNumbers = [];

for (const n of numbers) {
    const isEven = n % 2 === 0;
    if (!isEven) continue;
    evenNumbers.push(n);
}

console.log(evenNumbers); // [2, 4]
```

L'action de vérifier si un nombre est pair est une opération qui peut
être abstraite dans une fonction :

```js
/**
 * Determines if the given number is even.
 * @param {number} n
 * @returns {boolean}
 */
function isEven(n) {
    return n % 2 === 0;
}

expect(isEven(4)).toBe(true);
expect(isEven(3)).toBe(false);
```

On peut ensuite donner `isEven` en argument à la fonction d'ordre
supérieur `filter`, qui retournera un nouveau tableau contenant
seulement des nombres pairs :

```js
const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.filter(isEven);
console.log(evenNumbers); // => [2, 4]
```

Une fonction d'ordre supérieur telle que `filter` agit un peu comme une
boucle. On peut d'ailleurs écrire notre propre version de `filter` pour
mieux comprendre son fonctionnement :

```js
function filter(array, callback) {
    const results = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const meetsCondition = callback(element, i, array);
        if (meetsCondition) results.push(element);
    }
    return result;
}
```

La condition qui détermine si l'élément du tableau doit être inclus ou
non dans le résultat est abstraite par l'argument `callback`. Notez
d'ailleurs qu'on ne connaît pas ce que fait `callback` au moment de
définir `filter` (tout comme on ne connaît pas la valeur de `array`) :
on sait seulement qu'il s'agira d'une fonction. L'idée est d'abstraire
cette opération de sorte à ce qu'on puisse utiliser `filter` avec
différentes conditions.

On peut ainsi filtrer un tableau de chaînes selon si ses éléments
contiennent une sous-chaîne :

```js
const languages = ["JavaScript", "Go", "Python", "Rust"];
const searchQuery = "o";
const results = languages.filter(l => l.includes(searchQuery));
console.log(results); // => ["Go", "Python"]
```

Ou filtrer un tableau de nombres selon si ses éléments sont inclus dans
un intervalle :

```js
const numbers = [15, 5, 18, 52];
const results = numbers.filter(n => n >= 18 && n <= 30);
console.log(results); // => [18]
```

Dans les deux exemples ci-dessus, la fonction de rappel est une
expression de fonction fléchée. Puisque la fonction de rappel est
invoquée par `filter` (et non par un humain), on peut omettre son nom et
sa documentation.

### Map

La fonction d'ordre supérieur `map` procède de façon similaire à
`filter`, mais la fonction de rappel est utilisée pour _transformer_ les
éléments du tableau :

```js
const numbers = [1, 2, 3];
const increments = numbers.map(n => n + 1);
console.log(increments); // => [2, 3, 4]
```

Ce code utilise `map` pour transformer le tableau `numbers` en un autre
tableau contenant l'incrément de chaque nombre. La fonction de rappel
`n => n + 1` représente la transformation à appliquer à chaque élément
`n` du tableau.

Écrivons notre propre version de `map` pour mieux comprendre son
fonctionnement :

```js
function map(array, callback) {
    const results = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const transformed = callback(element, i, array);
        results.push(transformed);
    }
    return result;
}
```

Comme vous pouvez voir, la fonction de rappel `callback` est appliquée
sur chaque élément du tableau, et le résultat est inséré dans le tableau
`results`, qui est finalement retourné par `map`.

Voici un autre exemple où les chaînes d'un tableau sont transformées en
lettres majuscules :

```js
const languages = ["JavaScript", "Go", "Python", "Rust"];
const results = languages.map(l => l.toUpperCase());
console.log(results); // => ["JAVASCRIPT", "GO", "PYTHON", "RUST"]
```

Notez que le tableau produit par `map` contient toujours le même nombre
d'éléments que le tableau initial. Chaque élément initial est _associé_
(_mapped_, en anglais) à sa transformation.

### Every

La fonction d'ordre supérieur `every` détermine si _tous les éléments_
d'un tableau satisfont une condition représentée par la fonction de
rappel. On peut l'utiliser, par exemple, pour vérifier si tous les
nombres d'un tableau sont pairs :

```js
console.log([2, 4, 6].every(isEven)); // => true
console.log([1, 2, 3].every(isEven)); // => false
```

Notez que `every` produit toujours un booléen.

Écrivons notre propre version de `every` pour mieux comprendre son
fonctionnement :

```js
function every(array, callback) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const meetsCondition = callback(element, i, array);
        if (!meetsCondition) return false;
    }
    return true;
}
```

### Some

La fonction d'ordre supérieur `some` détermine si _au moins un élément_
d'un tableau satisfait une condition. On peut l'utiliser pour vérifier
si au moins un nombre d'un tableau est pair :

```js
console.log([1, 2, 3].some(isEven)); // => true
console.log([1, 3, 5].some(isEven)); // => false
```

Tout comme `every`, `some` produit toujours un booléen.

Écrivons notre propre version de `some` pour mieux comprendre son
fonctionnement :

```js
function some(array, callback) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const meetsCondition = callback(element, i, array);
        if (meetsCondition) return true;
    }
    return false;
}
```

### Reduce

La fonction d'ordre supérieur `reduce` _résume_ un tableau en une seule
valeur. Son fonctionnement est un peu plus compliqué que les autres
fonctions d'ordre supérieur. Elle prend deux arguments :

1. une fonction de rappel, et
2. une valeur utilisée pour accumuler le résultat.

La fonction de rappel est appliquée sur l'accumulateur et l'élément du
tableau, et sa valeur de retour devient l'accumulateur pour la prochaine
itération.

On peut utiliser `reduce`, par exemple, pour calculer la somme des
éléments d'un tableau de nombres :

```js
const numbers = [1, 2, 3];
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // => 6
```

Ici, la fonction de rappel est appelée trois fois par l'interpréteur
JavaScript :

1. Une première fois où `acc` est `0`, et `n` est `1`. La valeur de
   retour est `1` (`0 + 1`).
1. Une deuxième fois où `acc` est `1`, et `n` est `2`. La valeur de
   retour est `3` (`1 + 2`).
1. Une troisième fois où `acc` est `3`, et `n` est `3`. La valeur de
   retour est `6` (`3 + 3`).

La valeur de retour du dernier appel est retournée par `reduce`.

Écrivons notre propre version de `reduce` pour mieux comprendre son
fonctionnement :

```js
function reduce(array, callback, accumulator) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        accumulator = callback(accumulator, element, i, array);
    }
    return accumulator;
}
```

Comme vous pouvez voir, `reduce` procède comme une boucle `for` à
l'intérieur de laquelle on réaffecte une variable où est stocké le
résultat.

Voici un autre exemple où `reduce` est utilisée pour trouver la chaîne
la plus longue parmi un tableau de chaînes :

```js
const languages = ["JavaScript", "Go", "Python", "Rust"];
const longest = languages.reduce(longestString, languages[0]);
console.log(longest); // => "JavaScript"

/**
 * Returns the longest string between s1 and s2.
 * @param {string} s1
 * @param {string} s2
 * @returns {string}
 */
function longestString(s1, s2) {
    if (s1.length >= s2.length) return s1;
    else return s2;
}

expect(longestString("a", "ab")).toBe("ab");
expect(longestString("cde", "fg")).toBe("cde");
```
