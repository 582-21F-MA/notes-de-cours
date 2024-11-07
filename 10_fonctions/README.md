# Fonctions

JavaScript est un langage de programmation avec des fonctions de
première classe. Les fonctions y sont considérées comme des valeurs, de
la même façon que les chaînes de caractères, les booléens, les nombres,
etc. Une fonction peut être affectée à une variable, ou bien être
utilisée comme un argument. Une fonction peut même avoir comme valeur de
retour une autre fonction.

## Définition

Le mot-clé `function` permet de définir une nouvelle fonction. La
définition d'une fonction est une expression qui peut être affectée à
une variable comme n'importe quelle autre expression.

```ts
const square = function (n: number): number {
    return n * n;
};
```

Ci-dessus, l'expression qui suit l'opérateur `=` se nomme une
*expression de fonction* ou une *fonction anonyme*. 

Il est important de distinguer, d'une part, la *valeur de l'expression
de fonction*, et de l'autre, la *valeur de retour* de la fonction. La
valeur de la variable `square`, par exemple, est une expression de
fonction, alors que la valeur de retour de la fonction est `n * n`. Pour
obtenir la valeur de retour, on doit appeler ou appliquer la fonction
sur des arguments.

```ts
square    // => [Function: square] (expression de fonction)
square(2) // => 4 (valeur de retour de la fonction)
```

Affecter une fonction à une variable démontre bien que les fonctions
sont des valeurs. Cependant, nous définirons rarement les fonctions de
cette façon. Nous utiliserons plutôt les *déclarations de fonction*.

```ts
function add(n: number, m: number): number {
    return n + m;
}
```

Une déclaration de fonction est identique à une expression de fonction,
à la différence qu'un identifiant lui est donné immédiatement. Qu'une
fonction soit définie par une déclaration de fonction ou en affectant
une expression de fonction à une variable, on pourra toujours se référer
séparément à l'expression de fonction et à sa valeur de retour.

```ts
add       // => [Function: add] (expression de fonction)
add(2, 2) // => 4 (valeur de retour de la fonction)
```

### Fonctions fléchées

JavaScript offre une troisième façon de définir les fonctions : les
expressions de fonction fléchée.

```ts
const substract = (n: number, m: number): number => n - m;
```

Une fonction fléchée permet d'omettre les mots-clés `fonction` et
`return`. Ceux-ci sont remplacés par le symbole `=>`. La fonction
ci-dessus est donc équivalente à la définition suivante : 

```ts 
function substract(n: number, m: number): number {
    return n - m;
}
```

Quoique les fonctions fléchées sont surtout utiles lorsqu'une fonction
retourne une simple expression, elles peuvent aussi avoir un corps
délimité par des accolades. Dans ce cas, on devra utiliser le mot-clé
`return` pour préciser la valeur de retour.

```ts
const substract = (n: number, m: number): number => {
    return n = m; 
}
```

Outre la syntaxe plus courte, il y a certaines différences techniques
qui distinguent les expressions de fonction fléchée des expressions de
fonction régulières, mais nous discuterons de ces différences plus tard.
Pour l'instant, faites attention de ne pas abuser des fonctions
fléchées. À moins d'une bonne raison, on préférera les déclarations de
fonctions, lesquelles sont plus faciles à lire et à comprendre.

## Portée et effet de bord

En JavaScript, toutes les fonctions forment une *fermeture* avec la
portée dans laquelle elles ont été définies. Autrement dit, les
variables définies à l'*extérieur* d'une fonction sont accessibles à
l'*intérieur* de celle-ci. L'inverse n'est toutefois pas possible. On ne
peut pas accéder à une variable définie à l'*intérieur* d'une fonction à
l'*extérieur* de celle-ci.

```ts
let n = 1;

function increment(by: number): void {
    n + by;
}

increment(2);
console.log(n);  // => 3
console.log(by); // => error: cannot find name 'by'
```

Une fonction telle que `increment` qui modifie un état en dehors de son
environnement local est dite à *effet de bord* (*side effect* en
anglais). Quoique ces fonctions soient nécessaires dans un programme, on
les évitera lorsque possible car les effets de bord rendent le code plus
difficile à comprendre et à maintenir. Lorsque plusieurs fonctions
modifient une variable globale, il est ardu de suivre l'origine des
changements et d'identifier les erreurs. Une fonction à effet de bord
est aussi plus difficile à tester puisqu'elle dépend de facteurs
externes. Étant donné les mêmes arguments, elle ne retournera pas
toujours la même valeur.

## Valeurs par défaut des arguments

JavaScript permet d'initialiser un ou plusieurs paramètres d'une
fonction si aucune valeur n'est passée lors de son appel. La syntaxe
pour ce faire utilise l'opérateur d'affectation `=`.

```ts
function multiply(a: number, b = 1): number {
    return a * b;
}

const p1 = multiply(5, 2);
const p2 = multiply(5);

console.log(p1, p2); // => 10 5
```

Ci-dessus, la valeur par défaut du paramètre `b` est `1`.

## Fonctions variadiques

Une fonction variadique est une fonction ayant un nombre indéfini
d'arguments. En JavaScript, si le dernier paramètre d'une fonction est
préfixé de points de suspension, celui-ci devient un tableau dont les
éléments correspondent aux arguments sur lesquelles la fonction est
appliquée.

```ts
function add(...numbers: number[]): number {
    let sum = 0;
    for (let n of numbers) sum += n;
    return sum;
}

const sum = add(1, 2, 3);
console.log(sum); // => 6
```

On portera une attention particulière au type du paramètre `numbers`.
L'annotation `number[]` indique que `numbers` est un tableau de nombres
car c'est ainsi que les arguments seront accessibles dans le corps de la
fonction. Cela dit, on appliquera la fonction sur des nombres et non sur
des tableaux.

Par contraste, la fonction `concat` suivante est appliquée sur des
tableaux dont les éléments sont des nombres.

```ts
function addElements(...arrays: number[][]): number {
    let sum = 0;
    for (let a of arrays) {
        for (let e of a) sum += e;
    }
    return sum;
}

const sum = addElements([1, 2], [3, 4]);
console.log(sum); // => 10
```

## Méthodes

Une méthode désigne une propriété d'un objet dont la valeur est une
expression de fonction. Par définition, toutes les méthodes sont des
fonctions, mais toutes les fonctions ne sont pas des méthodes.

```ts
const ichigo = {
    name: "Ichigo Kurosaki",
    greet: function (greeting: string): string {
        return `${greeting}, I am ${ichigo.name}!`
    }
}

const greeting = ichigo.greet("hi");
console.log(greeting); // => "Hi, I am Ichigo Kurasaki!"
```

Vous remarquerez que la méthode `greet` accède à la valeur de la
propriété `name`, même si celle-ci est affectée à l'extérieur du corps
de la fonction.

## Annotation de type

Comment décrire la structure de l'objet `ichigo` ci-dessus avec
TypeScript ? La propriété `name` est clairement de type `string`, mais
qu'en est-il de la propriété `greet` dont la valeur est une fonction ?
L'annotation de type pour les fonction ressemble à la syntaxe utilisée
pour les expressions de fonction fléchée. 

Considérons par exemple un type `person` dont `ichigo` satisfait
l'interface :

```ts
type person = {
    name: string,
    greet: (greeting: string) => string,
};
```

Comme vous pouvez voir, le nom et le type des paramètres sont spécifiés
entre parenthèses, tandis que le type de la valeur de retour est indiqué
après le symbole `=>`.
