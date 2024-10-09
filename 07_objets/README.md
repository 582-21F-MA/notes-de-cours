# Objets

En JavaScript, presque tout est un objet. Même les types de valeurs
primitifs (chaînes, nombres, booléens), lesquels ne sont techniquement
pas des objets, actent souvent comme s'ils en étaient.

## Propriétés

Un objet est un type de valeurs composite contenant un ensemble de
*propriétés*, chacune ayant un nom (aussi appelé « clé ») et une valeur.
Le nom d'une propriété est généralement une chaîne de caractères, alors
que sa valeur peut être de n'importe quel type : chaîne, nombre,
booléen, tableau, objet, fonction. Une propriété dont la valeur est une
fonction est appelé une *méthode*.

```ts
const okarun = {
    name: "Ken Takakura",
    age: 16,
    believesInAliens: true,
    greet: function(name: string): string { return `Hi ${name}`; }
};
```

L'objet ci-dessus possède donc quatre propriétés (`name`, `age`,
`believesInAliens`, `greet`), dont une est une méthode (`greet`).

On accède à la valeur d'une propriété soit avec la notation avec un
point, soit avec la notation avec crochets. La notation avec crochets
permet de donner dynamiquement le nom de la propriété. Dans ce cas, le
nom correspond à la valeur de l'expression entre les crochets.

```ts
okarun.name             // => "Ken Takakura"
okarun["a" + "g" + "e"] // => 16
```

## Objects littéraux

La façon la plus simple de créer un nouvel objet est de définir la
structure de celui-ci entre accolades. On appelle cette forme un *objet
littéral* car on définit l'objet *littéralement*.

```ts
const point = { x: 0, y: 0};
```

Concrètement, un objet littéral est une expression qui crée et
initialise un nouvel objet à chaque fois qu'elle est évaluée. Une
fonction, par exemple, peut retourner un objet littéral. Une nouvelle
instance de l'objet sera créé à chaque fois que la fonction sera
appliquée.

```ts
function newPerson(name: string, age: number): { name: string, age: number } {
    return { name, string };
}

const seiko = newPerson("Seiko Ayase", 30);
const momo = newPerson("Momo Ayase", 16);

console.log(seiko); // => { name: "Seiko Ayase", age: 30 }
console.log(momo);  // => { name: "Momo Ayase", age: 16 }
```

Le code ci-dessus définit une fonction qui retourne un objet ayant une
propriété `name` et une propriété `age`. L'instruction de retour utilise
une syntaxe raccourcie qui permet de donner à la fois le nom et la
valeur d'une propriété. Ici, le nom de la propriété correspond à
l'identifiant du paramètre (`name` ou `age`), tandis que sa valeur
correspond à la valeur de l'argument.

## Prototype

En plus d'avoir son propre ensemble de propriétés, un objet hérite
également des propriétés d'un objet parent appelé *prototype*. Ce
prototype (aussi un objet) possède également son propre prototype,
lequel possède aussi son prototype, et ainsi de suite de sorte à créer
une *chaîne de prototypes*. Le seul objet à ne pas avoir de prototype
est `null`, qui est le dernier maillon de la chaîne.

Par défaut, les objets littéraux ont comme prototype `Object.prototype`.
On peut toutefois utiliser la fonction `Object.create` pour créer un
objet et spécifier son prototype.

```ts
const foo = { n: 1 };
const bar = Object.create(foo);
console.log(bar);   // {}
console.log(bar.n); // => 1
```

Ci-dessus, l'objet affecté à la variable `bar` hérite des propriétés de
`foo`. C'est pourquoi on peut accéder à la valeur de la propriété `n` à
partir de `bar`, même si ce dernier ne possède techniquement pas de
telle propriété.

Pour accéder au prototype d'un objet, on utilise la méthode
`Object.getPrototypeOf`, laquelle retourne le prototype de l'objet
donné.

```ts
Object.getPrototypeOf(bar) // => { n: 1 }
```

Nous reviendrons sur la notion de prototype et d'héritage à la prochaine
session. Pour l'instant, il est suffisant de comprendre que certaines
propriétés d'un objet sont héritées d'un objet parent.

## Mutation

Au contraire des primitifs, les objets sont mutables : on peut ajouter,
supprimer et modifier leurs propriétés, même après que l'objet aille été
créé. TypeScript étant toutefois plus strict que JavaScript, celui-ci ne
vous permettra pas d'ajouter une nouvelle propriété ou de supprimer une
propriété existante. Vous pouvez seulement modifier sa valeur.

```ts
const spirit = { name: "Turbo Granny" };
spirit.name = "Tābo Babā"; // OK
spirit.gender = "Female"; // error: Property 'gender' does not exist
```

## Référence

Au contraire des valeurs primitives, les objets sont manipulés par
*référence*. Lorsqu'un objet est affecté à une variable, la variable
contient une référence à l'objet, et non une copie de celui-ci.

Considérons l'exemple ci-dessous :

```ts
const foo = { n: 1 };
console.log(foo); // => { n: 1 }
const bar = foo;
bar.n = 2;
console.log(foo); // => { n: 2 }
```

Puisque la valeur de la variable `foo` est une référence à l'objet `{ n:
1 }`, la valeur affectée à la variable `bar` est une référence à l'objet
original. Lorsqu'on modifie la valeur de la propriété `n` à partir de la
variable `bar`, le changement est reflété dans `foo`. Ces deux variables
*pointent* en fait vers le même objet.

```
{ n: 1 } <- foo <- bar
```

Cette caractéristique des objets peut causer de la confusion, surtout
lorsque la valeur d'une propriété est modifiée depuis le corps d'une
fonction. Pour cette raison, il est préférable lorsque possible d'éviter
de muter un objet une fois que celui-ci est créé. Si une fonction doit
modifier la valeur d'une propriété d'un objet donné comme argument,
mieux vaut retourner un nouvel objet que de modifier l'original.

```ts
function incr(a: { p: number }): void {
    a.p++;
}
```

La function `incr` ci-dessus, par exemple, incrémente la valeur de la
propriété `p` de l'argument `a` sur lequel elle est appliquée, ce qui
aura comme effet de muter l'objet original *en dehors* de la fonction.

```ts
const o = { p: 1 };
incr(o);
console.log(o); // => { p: 2 }
```

Outre la potentielle confusion, cette version de `incr` est plus
difficile à tester car elle ne retourne aucune valeur. Plutôt, il serait
préférable de retourner un nouvel objet.


```ts
function incr(a: { p: number }): { p: number } {
    return { p: a.p + 1 };
}
```
