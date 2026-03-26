# Fonctions

De la même façon qu'une affectation permet d'abstraire une valeur, une
**fonction** permet d'abstraire une suite de commandes à exécuter. On
utilise les fonctions pour organiser le code, réduire la répétition, et
isoler les différentes parties d'un programme. La grande majorité du
code que vous écrivez devrait se trouver dans des fonctions.

## Définir une fonction

En JavaScript, on utilise le mot-clé `function` pour définir une
nouvelle fonction :

```js
const square = function(base) {
    return base * base;
};
```

Ce code fait deux choses :

1. il définit une fonction qui **retourne** le carré du **paramètre**
   `base`,
2. puis il affecte cette fonction à l'identifiant `square`.

Notez que le code qui se trouve entre accolades (le **corps** de la
fonction) n'est pas exécuté immédiatement. Pour exécuter celui-ci, on
doit **appeler** (ou **invoquer**) la fonction. Pour appeler une
fonction, on écrit son nom suivi de parenthèses, à l'intérieur
desquelles on fournit les **arguments** :

```js
const result = square(2);
console.log(result); // => 4
```

La plupart des fonctions retournent une valeur. Cette **valeur de
retour** est indiquée dans le corps par le mot-clé `return`. Au moment
d'évaluer l'expression `square(2)`, l'interprétateur JavaScript

1. remplace `square` par le corps de la fonction qui lui est affecté,
2. affecte l'argument `2` au paramètre `base`,
3. exécute les commandes en ordre, et
4. retourne l'expression qui se trouve à droite de `return`.

C'est pourquoi la valeur de `result` dans le code ci-dessus est `4`.

Une fonction qui ne retourne pas de valeur produit la valeur `undefined`
lorsqu'appelée. La fonction `console.log`, par exemple, ne retourne pas
de valeur :

```js
const result = console.log("foo");
console.log(result); // => undefined
```

### Expression de fonction versus valeur de retour

JavaScript est un langage de programmation avec des **fonctions de
première classe** ; c'est-à-dire que les fonctions y sont considérées
comme des valeurs. Une définition de fonction est une affectation comme
les autres, mais dont la valeur est une fonction plutôt qu'une chaîne ou
un booléen.

Puisque les fonctions sont des valeurs, il est important de distinguer
l'**expression de fonction** de sa **valeur de retour**. La valeur de
`square` est une expression de fonction, tandis que la valeur de retour
de cette fonction est le résultat de `base * base`.

```js
console.log(square); // => [Function: square] (expression de fonction)
console.log(square(2)); // => 4 (valeur de retour)
```

Comme vous pouvez le voir, `square` et `square(2)` ont des valeurs
différentes. Cette distinction sera d'autant plus importante lorsque
nous aborderons les fonctions d'ordre supérieur.

### Déclarations de fonction

Affecter une expression de fonction à une constante démontre bien le
fait que les fonctions sont des valeurs en JavaScript. Cependant, on
évite de définir les fonctions de cette manière. On utilise plutôt les
**déclarations de fonction** :

```js
function square(base) {
    return base * base;
}
```

Une déclaration de fonction produit le même résultat qu'une expression
de fonction affectée à une constante. Ceci dit, on préfère les
déclarations de fonctions car elles sont plus faciles à distinguer des
affectations régulières. Les déclarations de fonction permettent
également d'appeler une fonction _avant_ que celle-ci soit définie dans
le code :

```js
square(4); // OK !

function square(base) {
    return base * base;
}
```

On appelle cette caractéristique le **hissage** (_hoisting_ en anglais).

### Fonctions fléchées

JavaScript offre une troisième façon de définir une fonction : les
expressions de **fonction fléchée** (aussi appelée **lambda**).

```js
const square = (base) => base * base;
```

La syntaxe d'une fonction fléchée permet d'omettre les mots-clés
`function` et `return`. Ceux-ci sont remplacés par une flèche (`=>`). À
gauche de la flèche se trouvent les paramètres entre parenthèses, tandis
que la valeur de l'expression à droite de la flèche est celle retournée
par la fonction lorsqu'elle sera appelée.

Outre quelques différences techniques qui seront abordées plus tard, le
code ci-dessus produit le même résultat que les deux définitions
précédentes. Mais l'utilisation des expressions de fonction fléchée est
généralement réservée aux **fonctions anonymes**, un concept que nous
aborderons plus tard.

## Portée

La **portée** d'une affectation dicte le **contexte d'exécution** dans
lequel cette affectation est accessible. Jusqu'à présent, toutes nos
affectations avaient une **portée globale**. Une affectation ayant une
portée globale est accessible partout dans notre programme. Mais les
accolades qui délimitent le corps d'une fonction introduisent une
nouvelle portée : la **portée de bloc**.

En JavaScript, un **bloc** est un groupe d'instructions entouré
d'accolades. Les affectations déclarées dans un bloc sont accessibles
seulement à l'intérieur de ce bloc :

```js
function square(base) {
    const result = base * base;
    return result;
}

console.log(square(2)); // => 4
console.log(result); // => ReferenceError: Can't find variable: result
```

Les paramètres d'une fonction ont aussi une portée de bloc. Le paramètre
`base`, par exemple, n'est pas accessible à l'extérieur du corps de la
fonction `square` :

```js
function square(base) {
    const result = base * base;
    return result;
}

console.log(square(2)); // => 4
console.log(base); // => ReferenceError: Can't find variable: base
```

Puisque chaque fonction a sa propre portée, deux fonctions peuvent avoir
des identifiants identiques sans que ceux-ci entrent en conflit. Dans le
code ci-dessous, par exemple, les fonctions `square` et `power` ont
toutes deux des identifiants `base` et `result` sans que cela cause
problème :

```js
function square(base) {
    const result = base * base;
    return result;
}

function power(base, exponent) {
    const result = base ** exponent;
    return result;
}

console.log(square(2)); // => 4
console.log(power(3, 4)); // => 81
```

Pareillement, chaque appel d'une même fonction a sa propre portée.
Ainsi, dans la fonction `square`, la valeur de `result` est `4` lorsque
`base` est `2`, mais sa valeur est `9` lorsque `base` est `3` :

```js
console.log(square(2)); // => 4
console.log(square(3)); // => 9
```

Comme chaque fonction a sa propre portée, on peut comprendre une
fonction sans avoir à connaître ce qui se passe à l'extérieur de
celle-ci. Cette isolation entre les différentes parties du code est
essentielle pour la conception de programmes de grande envergure (pensez
à des millions de lignes de code). Sinon, il faudrait lire et comprendre
la totalité du code source pour effectuer n'importe quel petit
changement. C'est pourquoi on évite autant que possible de déclarer des
affectations dans la portée globale.

## Documentation

Une fonction est écrite une seule fois, mais elle sera lue et modifiée
des dizaines, voire des centaines de fois par plusieurs personnes
différentes. Pour cette raison, il est important de bien _documenter_
les fonctions qu'on écrit.

> [!NOTE]
> _Documenter_ ne veut pas dire _commenter_. On documente une fonction
> pour expliquer _comment_ l'utiliser ; on commente le code pour
> expliquer _pourquoi_ il est écrit ainsi. Toutes vos fonctions doivent
> être documentées, mais du code bien écrit nécessite peu de
> commentaires.

En JavaScript, on utilise [JSDocs] pour documenter une fonction. JSDocs
est une extension de JavaScript qui permet de décrire l'**interface**
d'une fonction (c'est-à-dire comment interagir avec elle) dans un
commentaire spécial.

Voici par exemple comment documenter la fonction `square` :

```js
/**
 * Computes the square of base.
 *
 * @param {number} base
 * @returns {number}
 */
function square(base) {
    return base * base;
}
```

Un commentaire JSDocs commence avec les caractères `/**`, et se termine
avec `*/`. La première ligne contient une phrase qui décrit brièvement
ce que fait la fonction. Les lignes commençant par la balise `@param`
indiquent le type (entre accolades) et le nom des paramètres. La
dernière ligne, qui commence par la balise `@returns`, indique le type
de la valeur de retour.

> [!NOTE]
> La description peut être écrite en français, mais le type entre
> accolades doit toujours être en anglais.

Voici d'autres exemples :

```js
/**
 * Computes the power of the base to the given exponent.
 *
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 */
function power(base, exponent) {
    return base ** exponent;
}

/**
 * Determines if the given password is long enough.
 *
 * @param {string} password
 * @returns {boolean}
 */
function isLongEnough(password) {
    const maxLength = 12;
    return password.length >= maxLength;
}
```

Notez que les descriptions n'expliquent pas comment les fonctions
produisent leur résultat. Pour comprendre l'**implémentation** d'une
fonction, il suffit de lire son corps. La documentation se concentre sur
comment utiliser la fonction.

[JSDocs]: https://jsdoc.app/

## Tests automatisés

Lorsqu'on écrit une fonction, il est commun de tester celle-ci
manuellement avec `console.log`. Ainsi, pour s'assurer que `square`
calcule correctement le carré d'un nombre, on l'appelle avec différents
arguments, et on vérifie que le résultat affiché dans la console est
celui auquel on s'attend :

```js
console.log(square(2)); // => 4 (OK)
console.log(square(3)); // => 9 (OK)
console.log(square(4)); // => 16 (OK)
```

Si les résultats affichés ne sont pas ceux auxquels on s'attend, alors
la fonction contient une erreur logique (un **bogue**), et on doit la
corriger.

Mais une fois la fonction terminée, que faire avec ces tests ? Il est
mal vu de laisser traîner des appels à `console.log` dans le code car
ceux-ci polluent la console. On doit donc les effacer. En même temps,
lorsqu'on modifiera éventuellement le code, ces tests permettraient de
valider que nos changements ne brisent pas la fonction (on parlerait
alors de **régression**).

La solution est de créer des **tests automatisés**. Un test automatisé
est un bout de code qui intègre directement dans le programme nos
attentes quant au comportement d'une fonction. Ces tests sont exécutés
automatiquement à chaque fois que le code change, de sorte à nous
avertir si un test échoue.

Malheureusement, JavaScript n'inclut pas les fonctionnalités nécessaires
pour écrire des tests automatisés. C'est pourquoi on utilise des
bibliothèques externes telles que Jest ou Vitest. Ces bibliothèques
offrent toutes une interface similaire : les fonctions `expect` et
`toBe` permettent de déclarer le résultat attendu d'une expression. Par
exemple :

```js
expect(square(2)).toBe(4);
```

Ce code indique qu'on s'attend (_expect_) à ce que la valeur de
`square(2)` soit (_to be_) `4`. Si ce n'est pas le cas, le test échoue
et une erreur est affichée.

Dans ce cours, on vous demande d'inclure au moins deux tests automatisés
pour chacune des fonctions que vous écrivez. Pour utiliser `expect` et
`toBe` dans votre code, vous devez d'abord ajouter la balise `<script>`
ci-dessous _avant_ votre script :

```html
<script src="https://582-21f-ma.github.io/test/expect.js" defer></script>
```

Si un test échoue, le message d'erreur s'affichera dans la console. Par
exemple :

```js
expect(square(2)).toBe(10);
// => Test failed on line 1: expected the number 10, but received the number 4.
```

## Effets de bord

Quoique la plupart des fonctions retournent une valeur, ce n'est pas le
cas pour toutes. Une fonction comme `console.log` ne retourne rien car
on l'invoque pour afficher une valeur dans la console, et non pour
effectuer un calcul. Son « résultat » n'est pas sa valeur de retour,
mais plutôt l'_effet_ qu'elle a sur son _environnement extérieur_. C'est
pourquoi on qualifie `console.log` de **fonction à effet de bord**
(_side effect_ en anglais).

En programmation, une fonction à effet de bord est une fonction dont
l'appel modifie un état en dehors de son environnement local. Voici
quelques exemples d'effets de bord :

- Écrire dans la console.
- Réaffecter une variable globale.
- Afficher une boîte de dialogue ou de saisie.
- Faire une requête réseau.
- Obtenir la date d'aujourd'hui.
- Muter un argument.
- Écrire ou lire un fichier.

Vous remarquerez que ces actions ne peuvent pas être validées par un
test automatisé car leur résultat dépend de facteurs externes : un
navigateur, un serveur, un fichier, la portée globale, etc. La fonction
ci-dessous, par exemple, ne peut pas être testée automatiquement avec
`expect` et `toBe` car elle dépend de la saisie de l'utilisateur·rice,
et affiche son résultat dans la console :

```js
/**
 * Greets a person.
 */
function greet() {
    const name = prompt("What is your name?");
    alert(`Hi ${name}`);
}
```

En comparaison, une fonction qui ne contient pas d'effet de bord est
dite **pure**. Les fonctions pures sont faciles à tester car elles
produisent toujours le même résultat pour les mêmes arguments. La
fonction `square` est pure car elle retourne toujours `4` si on
l'appelle avec l'argument `2`.

Évidemment, il est impossible d'écrire un programme utile sans effet de
bord. Mais comme les fonctions à effet de bord sont difficiles à tester
(et que les tests automatisés sont un gage de fiabilité), mieux vaut les
cantonner à certaines parties du programme. Une meilleure version de la
fonction `greet`, par exemple, prend `name` comme argument, et retourne
la salutation :

```js
/**
 * Returns a greeting for the given name.
 *
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
    return `Hi ${name}!`;
}

expect(greet("Bob")).toBe("Hi Bob!");
expect(greet("Xin")).toBe("Hi Xin!");
```

## Point d'entrée

Un bon endroit pour mettre les effets de bord est la fonction `main`.
Dans beaucoup de langages de programmation, la fonction `main` est le
**point d'entrée** du programme ; c'est la première fonction où
l'exécution du programme commence, et celle qui invoque les autres
fonctions.

Voici par exemple à quoi pourrait ressembler la fonction `main` d'un
programme qui appelle `greet` :

```js
function main() {
    const name = prompt("What is your name?");
    const greeting = greet(name);
    alert(greeting);
}
```

Notez que JavaScript ne traite pas l'identifiant `main` spécialement,
comme c'est le cas pour d'autres langages de programmation. On pourrait
appeler le point d'entrée de notre programme `app` ou `start`. Mais
`main` est le nom conventionnel.

## Responsabilité unique

Un autre problème des fonctions à effet de bord est qu'elles mélangent
plusieurs tâches. Considérons de nouveau la mauvaise implémentation de
`greet` :

```js
/**
 * Greets a person.
 */
function greet() {
    const name = prompt("What is your name?");
    alert(`Hi ${name}`);
}
```

La documentation dit seulement que la fonction salue une personne, mais
en réalité elle fait trois choses :

1. Demander le nom de l'utilisateur.
2. Construire la salutation.
3. Afficher la salutation.

Or, une fonction devrait avoir _une seule_ responsabilité. Les fonctions
qui font plusieurs tâches sont plus complexes, donc plus difficiles à
lire, à modifier et à tester.
