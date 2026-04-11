# Branchements

Un programme est exécuté du haut vers le bas. Le code ci-dessous, par
exemple, contient trois commandes :

1. la première demande à l'utilisateur·rice de saisir un nombre ;
2. la deuxième, exécutée après la première, affecte le carré du nombre
   saisi au nom `square` ; et
3. la troisième, exécutée après la deuxième, affiche un message.

```js
const base = Number(prompt("Saisissez un nombre"));
const square = base * base;
alert(`Le nombre ${base} est la racine carrée de ${square}`);
```

> [!NOTE]
> Dans les notes de cours, on omet parfois de placer le code dans une
> fonction afin de simplifier les exemples. Rappelez-vous toutefois que
> tout le code que vous écrivez devrait se trouver dans des fonctions.

Mais tous les programmes ne sont pas des lignes droites. Il est parfois
nécessaire de créer des **branchements** dans le code, c'est-à-dire
d'exécuter des commandes seulement si une condition est satisfaite.

En JavaScript, on utilise le mot-clé `if` pour introduire de telles
commandes conditionnelles. Pour reprendre l'exemple précédent, on
pourrait vouloir afficher un message d'erreur si la saisie n'est pas un
nombre :

```js
if (Number.isNaN(base)) alert(`${base} n'est pas un nombre`);
```

Une commande `if` exécute une commande ou un bloc de commandes si
l'expression entre parenthèses est considérée comme vraie par
l'interpréteur.

```
if (<expression>) <commande>

if (<expression>) {
    <commande>
    <commande>
}
```

> [!NOTE]
> Les affectations déclarées à l'intérieur d'un bloc conditionnel ont
> une portée locale, c'est-à-dire qu'elles sont seulement accessibles à
> l'intérieur de ce bloc.

On utilise la commande `else` pour introduire une branche qui sera
exécutée seulement si les branches précédentes ne le sont pas. Pour
reprendre le même exemple : on affiche un message d'erreur seulement si
la saisie n'est pas un nombre, _sinon_ (_else_) on affiche le carré du
nombre.

```js
if (Number.isNaN(base)) alert(`${base} n'est pas un nombre`);
else {
    const square = base * base;
    alert(`Le nombre ${base} est la racine carrée de ${square}`);
}
```

Les mots-clés `else` et `if` peuvent être combinés pour introduire une
branche qui sera exécutée seulement si les branches précédentes ne le
sont pas _et_ si une condition est vraie :

```js
const input = Number(prompt("Saisissez un nombre"));

if (input < 0) alert(`Le nombre ${input} est négatif`);
else if (input > 0) alert(`Le nombre ${input} est positif`);
else alert("Le nombre est zéro");
```

## Cas nominal

En programmation, le **cas nominal** (ou _happy path_) désigne le
_déroulement normal_ d'un programme, où toutes les étapes s'exécutent
correctement, sans erreurs ni cas particulier. Par exemple, considérons
de nouveau ce programme qui affiche le carré d'un nombre saisi par
l'utilisateur·rice :

```js
function main() {
    const base = Number(prompt("Saisissez un nombre"));
    if (Number.isNaN(base)) {
        alert(`${base} n'est pas un nombre`);
    } else {
        const square = base * base;
        alert(`Le nombre ${base} est la racine carrée de ${square}`);
    }
}
```

_Normalement_, l'utilisateur·rice saisit un nombre. Le cas nominal se
trouve donc dans la branche `else` du code, où on calcule et affiche le
carré de ce nombre. La branche `if` sert à gérer un _cas d'exception_,
lorsque la saisie n'est pas un nombre.

En règle générale, le code exécuté dans le cadre du cas nominal devrait
être le moins imbriqué possible, puisque c'est la partie la plus
importante du programme. La raison est simple : plus le code est
imbriqué, plus il est difficile à lire.

Ajoutons par exemple une autre contrainte (arbitraire) à notre programme
— le carré du nombre saisi doit être plus grand que 100 :

```js
function main() {
    const base = Number(prompt("Saisissez un nombre"));
    if (Number.isNaN(base)) {
        alert(`${base} n'est pas un nombre`);
    } else {
        const square = base * base;
        const minSquare = 100;
        if (square < minSquare) {
            alert(
                `Le carré du nombre doit être plus grand que 100`,
            );
        } else {
            alert(
                `Le nombre ${base} est la racine carrée de ${square}`,
            );
        }
    }
}
```

Le cas nominal (c'est-à-dire, afficher le carré du nombre saisi) est
maintenant _doublement_ imbriqué : une fois dans le premier `else`, puis
encore dans le deuxième `else`. Et comme un bloc hérite de la portée
environnante, il faut lire les deux blocs pour bien comprendre le code.

### Retour anticipé

Une solution à ce problème est le **retour anticipé** (_early return_ en
anglais) :

```js
function main() {
    const base = Number(prompt("Saisissez un nombre"));
    if (Number.isNaN(base)) {
        alert(`${base} n'est pas un nombre`);
        return;
    }
    const square = base * base;
    const minSquare = 100;
    if (square < minSquare) {
        alert(`Le carré du nombre doit être plus grand que 100`);
        return;
    }
    alert(`Le nombre ${base} est la racine carrée de ${square}`);
}
```

Comme son nom l'indique, un retour anticipé est une commande `return`
exécutée avant la fin de la fonction, lors d'un cas d'exception. Le code
ci-dessus inclut deux retours anticipés : un pour chaque cas d'exception
(pas un nombre, et carré trop petit). L'avantage des retours anticipés
est qu'ils permettent d'omettre les branches `else`, et donc de ne pas
imbriquer le cas nominal. Chaque cas d'exception a sa propre portée, ce
qui permet aux lecteur·rices de se concentrer sur le déroulement normal
du code, sans avoir à se soucier des exceptions.

## Opérateur conditionnel

Les commandes `if` et `else` ne produisent pas de valeur. On ne peut
donc pas les utiliser où une expression est attendue, comme lorsqu'on
veut affecter une valeur à un identifiant :

```js
// Incorrect
const msg = if (isLoggedIn) "Welcome back"; else "Please log in";
```

Le code ci-dessus, qui tente de définir `msg` selon la valeur de
`isLoggedIn`, est incorrect. Il faut plutôt déclarer la variable
d'abord, puis lui affecter une valeur dans les branches `if` et `else` :

```js
// Correct
let msg;
if (isLoggedIn) msg = "Welcome back";
else msg = "Please log in";
```

Quoique correcte, cette deuxième version est plus difficile à lire que
la première. De plus, si on oublie la commande `else`, la valeur de
`msg` sera `undefined`. Pour ces raisons, JavaScript inclut un
**opérateur conditionnel** qui fonctionne à la manière de `if..else`,
mais qui produit une valeur :

```js
// Préférable
const msg = isLoggedIn ? "Welcome back" : "Please log in";
```

La valeur d'une expression qui contient l'opérateur conditionnel dépend
de l'opérande à gauche du `?`. Si `isLoggedIn` est vrai, alors la valeur
de `msg` sera `"Welcome back"`. Sinon, sa valeur sera `"Please log in"`.
