# Fonctions de rappel

Une *fonction de rappel* est une expression de fonction passée comme
argument à une autre fonction. Une fonction dont un des paramètres est
une fonction de rappel se nomme une *fonction d'ordre supérieur*. 

La fonction native `setInterval` vue précédemment, par exemple, est une
fonction d'ordre supérieur puisque son premier paramètre est un fonction
de rappel.

```ts
setInterval(() => console.log("foo"), 1000);
//          ------------------------
//             fonction de rappel
```

La fonction de rappel ci-dessus est une expression de fonction fléchée,
mais le même principe s'applique aux autres types de fonction. Le code
suivant est équivalent :

```ts
function foo() {
    return console.log("foo");
}

setInterval(foo, 1000);
```

Quoique plusieurs des exemples ci-dessous utilisent des expressions de
fonction fléchée pour être plus succincts, il est généralement
préférable de donner un nom aux fonctions de rappel, surtout si elles
sont complexes.

## Révision : expressions de fonction

On se souvient  que dans les langages de programmation ayant des
fonctions de première classe tel que JavaScript, une fonction est une
expression qui peut être affectée à une variable comme n'importe quelle
autre valeur.

```ts
const square = function (n: number): number {
    return n * n;
};
```

Ci-dessus, la valeur de `square` est une *expression de fonction*,
tandis que la *valeur de retour* de la fonction est `n * n`. 

```ts
square    // => [Function: square] (expression de fonction)
square(2) // => 4 (valeur de retour de la fonction)
```

Il est crucial de comprendre cette distinction pour bien utiliser les
fonctions de rappel et les fonctions d'ordre supérieur.

## Déclarer une fonction d'ordre supérieur

Puisqu'une expression de fonction peut être affectée à une variable, et
que les arguments d'une fonction sont des variables, rien ne nous
empêche de déclarer une fonction dont un ou plusieurs des paramètres
sont de type « fonction ».

Considérons la fonction d'ordre supérieur suivante, laquelle répète un
nombre `n` de fois la fonction de rappel `callback` donnée (nous
omettons pour l'instant les annotations de type) :

```ts
function repeat(n, callback) { 
    for (; n > 0; n--) callback();
}
```

La fonction `repeat` a deux paramètres : le paramètre `n` est un nombre,
alors que le paramètre `callback` est une fonction de rappel. Vous
remarquerez que `callback` est appelé à l'intérieur de la fonction
`repeat`, même si on ne sait pas à quelle procédure elle correspond. De
la même manière que `n` permet d'abstraire le nombre de répétition,
`callback` permet d'abstraire l'action qui sera répétée.

Voici comment on applique la fonction `repeat` sur des arguments :

```ts
repeat(3, () => console.log("foo")); // => foo foo foo
//        ------------------------
//           fonction de rappel
```

## Annotation de type pour une fonction de rappel

Si une expression de fonction est une valeur, alors celle-ci a un type.
En TypeScript, il n'est pas suffisant de dire qu'un paramètre est de
type « fonction ». Il faut préciser quel type de fonction, c'est-à-dire
quels sont ses paramètres et quelle est sa valeur de retour.

L'annotation de type pour une fonction utilise la même syntaxe que les
expressions de fonction fléchée. Le paramètre `callback` de la fonction
`repeat`, par exemple, est une fonction de rappel qui ne prend aucun
argument et ne retourne rien. Voici à quoi ressemble son annotation :

```ts
type callback = () => void;
```

Puisque l'annotation de type d'une fonction de rappel peut porter à
confusion, il est recommandé de toujours créer un alias pour celui-ci.

## Appliquer une fonction de rappel sur des arguments

Une fonction de rappel peut avoir un ou plusieurs paramètres, la valeur
desquels sera passée à la fonction de rappel lorsque celle-ci sera
appelée par la fonction d'ordre supérieur.

Modifions par exemple la procédure de la fonction `repeat` sorte à ce
que la fonction de rappel ait accès à l'index de la boucle `for`.

```ts
function repeat(n: number, c: callback): void {
    for (let i = 0; i <= n; i++) c(i);
}
```

Comme vous pouvez voir, il suffit de passer le ou les arguments voulus
lorsqu'on appelle la fonction de rappel à l'intérieur de la fonction
d'ordre supérieur. La valeur de `i` sera désormais accessible à la
fonction de rappel.

```ts
repeat(3, (i) => console.log(`Index : ${i}`));
```

Bien sûr, on devra aussi modifier l'annotation de type de `callback`
puisque la fonction a désormais un paramètre.

```ts
type callback = (i: number) => void;
```
