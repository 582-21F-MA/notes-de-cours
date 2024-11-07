# Tableaux

En JavaScript, un tableau est un type spécial d'objet qui contient une
liste de valeurs ordonnées. À cause de leur prévalence, les tableaux
possèdent leur propre syntaxe, différente de celle pour les autre types
d'objet.

## Créer un tableau

On définit les éléments d'un tableau par une liste entre crochets droits
de valeurs séparées par des virgules. Les valeurs peuvent être de types
différents, quoiqu'il est plus commun pour un tableau de contenir des
valeurs du même type.

```ts
const fruits = ["apple", "banana", "kiwi"];
```

On appelle cette construction un *tableau littéral*. Un tableau littéral
peut être vide, dans quel cas le tableau sera initialisé sans aucun
élément. En TypeScript, on devra toutefois préciser le type des futurs
valeurs d'un tableau vide. Sinon, le vérificateur de type considérera
que le tableau sera toujours vide.

```ts
const numbers: number[] = [];
```

La constante `numbers` ci-dessus pointe donc vers un tableau vide qui
pourra éventuellement contenir des nombres (et rien d'autre). Comme
toujours, l'annotation de type se trouve après les deux points.

Il existe aussi plusieurs fonctions qui permettent de créer un tableau.
La fonction `Array`, par exemple, retourne un tableau qui contient les
valeurs données.

```ts
const colors = new Array("red", "green", "blue");
```

La fonction `Array` est spéciale en ce qu'elle doit toujours être
précédée du mot-clé `new`.

## Accéder aux éléments d'un tableau

Il existe plusieurs façons d'accéder aux éléments d'un tableau. La plus
simple est la notation entre crochets, similaire à comment on accède aux
caractères d'une chaîne.

```ts
const f = fruits[0];
console.log(f); // => "apple"
```

Attention, le code ci-dessus n'extrait pas la valeur `"apple"` du
tableau `fruits` (comme on extrait une dent). La valeur de `f` est une
copie du premier élément du tableau.

L'index donné entre crochet est toujours positif. Pour accéder au
dernier élément d'un tableau de longueur inconnue, on peut utiliser la
propriété `length` du tableau en question, laquelle a comme valeur le
nombre d'élément qu'un tableau contient.

```ts
console.log(colors.lenght); // => 3
const c = colors[colors.length - 1];
console.log(c); // => "blue"
```

### Manipuler un tableau

Les tableaux étant des objets, il est possible de les muter. La notation
entre crochet, par exemple, peut être utiliser pour réaffecter la valeur
d'un élément.

```ts
const letters = ["a", "b", "c"];
letter[1] = "e";
console.log(letters); // => ["a", "e", "c"]
```

Muter un objet déclaré localement est acceptable, mais on fera attention
d'éviter la mutation de tableaux ayant été déclarés à l'extérieur de la
portée courante. Cela peut cause des bogues qui sont difficiles à
repérer, et rendre un programme difficile à maintenir.

```ts
function createSequence(max: number): number[] {
    const s: number[] = [];
    for (let i = 1, i <= max, i++) s.push(i);
    return s;
}
```

La fonction ci-dessus retourne un tableau qui contient une suite de
nombre de 1 à `max`. Un tableau `s` est créé à l'intérieur de la
fonction, puis muté avec la méthode `push` qui ajoute la valeur donnée à
la fin du tableau. Puisque le tableau est modifié dans le même
environnement où il a été déclaré, la mutation est acceptable.

Les méthodes `push`, `pop`, `unshift` et `shift` (lesquelles ajoutent et
retirent respectivement un élément au début ou à la fin du tableau) sont
des fonctions qui mutent le tableau original. Pour cette raison, ont les
utilisera prudemment.

Considérons un contre-exemple où un tableau déclaré à l'extérieur d'une
fonction est modifié à l'intérieur de celle-ci.

```ts
function changeNum(arr: number[], i: number, newNum: number): void {
    arr[i] = newNum;
}

const evenNums = [2, 5, 6];
changeNum(evenNums, 1, 4);
console.log(evenNums); // => [2, 4, 6]
```

Ici, l'argument `arr` représente un tableau créé à l'extérieur de la
fonction `changeNum`. Puisque les objets sont affectés par référence, le
tableau original `evenNums` est donc muté à partir de l'intérieur de la
fonction, ce qui est à éviter. Plutôt, il serait préférable de retourner
une nouvelle copie du tableau, sans changer l'original.

```ts
function changeNum(arr: number[], i: number, newNum: number): number[]
{
    const newArr = arr.slice();
    newArr[i] = newNum;
    return newArr;
}

let evenNums = [2, 5, 6];
evenNums = changeNum(evenNums, 1, 4);
```

La méthode native `slice` renvoie une copie du tableau sur lequel elle
est appliquée. Elle est souvent utilisée pour obtenir une portion du
tableau original, mais si la fonction est appelée sans argument, alors
une copie du tableau complet est retournée.

La méthode native `concat` est similaire en ce que, étant donnée deux
tableaux, elle retourne un nouveau tableau qui représente la
concaténation des originaux. Elle peut être une bonne alternative à
`push`, `unshift`, etc. lorsqu'il faut ajouter un élément à un tableau
sans muter celui-ci.

```ts
let oddNums = [1, 3, 5];
oddNums = oddNums.concat([7]);
console.log(oddNums); // => [1, 3, 5, 7]
```

Vous remarquerez que l'argument donné à `concat` est un tableau
littéral. Techniquement, on n'ajoute pas la valeur `7` au tableau
`oddNums`. Plutôt, on ajoute bout à bout les deux tableaux `[1, 3, 5]`
et `[7]` pour en créer un troisième.

### Itérer sur un tableau

La boucle `for..of` permet d'itérer sur tous les éléments d'un tableau.

```ts
for (const n of [1, 2, 3]) console.log(n); // => 1 2 3
```

La variable avant le mot-clé `of` correspond à un élément du tableau,
lequel est spécifié après le mot-clé `of`. L'instruction suivant les
parenthèses sera exécutée pour chaque élément du tableau. Celle-ci peut
aussi être remplacée par un bloc.

```ts
function joinStrings(strings: string[]): string {
    let result = "";
    for (s of strings) {
        result += s;
    }
    return result;
}
```

Outre les boucles, il existe aussi des méthodes pour itérer sur les
éléments d'un tableau. Celles-ci sont toutefois plus complexes à
utiliser car ce sont des fonctions d'ordre supérieures. Nous en
reparlerons plus tard.
