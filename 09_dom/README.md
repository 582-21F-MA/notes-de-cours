# Modèle objet de document

Lorsque vous entrez une adresse URL dans la barre de recherche d'un
navigateur (par exemple, `https://exemple.com/about/index.html`),
celui-ci envoie une **requête HTTP** au serveur qui correspond au **nom
de domaine** de l'adresse (`exemple.com`). Une requête HTTP est une
demande d'accès à une ressource spécifique identifiée par le **chemin**
de l'adresse URL (`/about/index.html`). Lorsqu'il reçoit la requête, le
serveur analyse celle-ci, puis renvoie une **réponse HTTP** qui contient
(ou non) la ressource demandée.

![HTTP](http.png)

Si la ressource demandée est un document HTML, une feuille de style, un
script ou un module JavaScript, le contenu de la réponse sera sous forme
de **texte brut** (imaginez une longue chaîne de caractères). C'est la
tâche du navigateur d'_interpréter_ cette chaîne afin d'en permettre
l'affichage ou l'exécution.

Dans le cas d'un document HTML, le navigateur produit une représentation
en mémoire appelée **modèle objet de document**, ou **DOM** (_Document
Object Model_, en anglais). Le DOM est une structure de données qui
représente l'état _actuel_ d'une page. Avec JavaScript, on peut observer
ou modifier cette structure, et voir les changements s'afficher à
l'écran en temps réel.

> [!NOTE]
> Il est important de distinguer, d'une part, le document HTML, et de
> l'autre, le DOM. Le navigateur n'affiche pas le document HTML ; il
> affiche le DOM. Pareillement, JavaScript nous permet de manipuler le
> DOM, et non pas le document HTML.

Le DOM est un **arbre enraciné**, c'est-à-dire un graphe n'ayant pas de
circuit, possédant une seule racine, et dont tous les nœuds ont un seul
parent. Dans le domaine de la théorie des graphes, les éléments d'un
graphe sont appelés des **nœuds**. Les nœuds n'ayant pas d'enfant sont
appelés des **feuilles**, et un nœud n'ayant pas de parent est une
**racine**.

![arbre](arbre.png)

Dans le DOM, tous les éléments HTML sont des nœuds du graphe. Le graphe
comprend aussi des nœuds texte pour représenter le texte à l'intérieur
des éléments HTML, ainsi que des nœuds commentaire pour les commentaires
qui se trouvent dans le document.

Considérons par exemple le document HTML ci-dessous :

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Exemple</title>
    </head>
    <body>
        <h1>Contact</h1>
        <p>
            Allô, mon nom est Marijn. Vous pouvez me contacter
            <a href="/exemple">ici</a>
            .
        </p>
    </body>
</html>
```

On pourrait représenter celui-ci avec l'arbre enraciné suivant :

![dom](dom.png)

Notez que les nœuds texte (et les nœuds commentaire) sont toujours des
feuilles. Seuls les nœuds élément peuvent avoir des enfants.

Cette [page Web] vous permet de visualiser le DOM de différents
documents HTML.

[page Web]: https://bioub.github.io/dom-visualizer/

## Traverser le DOM avec JavaScript

En JavaScript, on accède au DOM à partir de l'identifiant global
`document`, lequel pointe vers un objet de type `Document`. La propriété
`documentElement` de `document` pointe vers un objet qui représente le
nœud racine du document. Normalement, celui-ci est l'élément `<html>` :

```js
const root = document.documentElement;
console.log(root); // => <html>...</html>
```

Quoique la console du navigateur affiche les nœuds comme si c'était des
chaînes de caractères, ce n'est pas le cas. Un nœud est toujours un
objet. L'affectation `root` ci-dessus, par exemple, pointe vers un objet
de type `HTMLElement`. Il existe d'ailleurs des types d'objet pour
représenter la plupart des éléments HTML : `HTMLParagraphElement`,
`HTMLInputElement`, `HTMLTableElement`, etc. Vous pouvez utiliser ces
types pour documenter vos fonctions.

Les objets qui représentent les nœuds du DOM ont des propriétés qui
pointent vers les autres nœuds auxquels ils sont connectés. On peut
ainsi traverser le DOM, et éventuellement modifier la structure de
celui-ci. Vous trouverez ci-dessous quelques-unes de ces propriétés.

### childNodes et children

La propriété `childNodes` d'un nœud élément est une collection
`NodeList` contenant tous ses nœuds enfant, incluant les nœuds texte et
commentaire :

```js
const rootChildNodes = document.documentElement.childNodes;
console.log(rootChildNodes); // => NodeList [<head>, #text "\n", <body>]
```

La propriété `children` est similaire, mais elle inclut seulement les
nœuds élément :

```js
const rootChildElements = document.documentElement.children;
console.log(rootChildElements); // => HTMLCollection [<head>, <body>]
```

Les objets de type `NodeList` et `HTMLCollection` sont similaires aux
tableaux. On peut accéder à leurs éléments avec la notation entre
crochets, et on peut itérer sur ceux-ci avec une boucle `for..of`.
Certaines méthodes propres aux tableaux telles que `concat` et `slice`
ne sont toutefois pas accessibles sur les objets `NodeList` et
`HTMLCollection`. On utilise la fonction `Array.from` pour les convertir
en `Array` :

```js
console.log(Array.from(rootChildElements)); // => [<head>, <body>]
```

### parentNode

La propriété `parentNode` d'un nœud pointe vers son nœud parent :

```js
const root = document.body.parentNode;
console.log(root); // => <html>...</html>
```

> [!NOTE]
> La propriété `body` de `document` se réfère toujours à l'élément HTML
> `<body>`.

Si le nœud est la racine du document, alors la valeur de `parentNode`
est `null` :

```js
console.log(root.parentNode); // => null
```

### firstChild et lastChild

Les propriétés `firstChild` et `lastChild` d'un nœud élément pointent
respectivement vers son premier et dernier nœud enfant :

```js
console.log(root.firstChild); // => <head>...</head>
console.log(root.lastChild); // => <body>...</body>
```

### previousSibling et nextSibling

Les propriétés `previousSibling` et `nextSibling` d'un nœud pointent
respectivement vers le nœud précédent et suivant ayant le même nœud
parent :

```js
console.log(document.head.nextSibling); // => <body>...</body>
console.log(document.body.previousSibling); // => <head>...</head>
```

## Chercher des éléments

Quoiqu'il soit pratique de savoir traverser le DOM, on cherche souvent à
obtenir la référence d'un élément en particulier. Dans ce cas, il n'est
pas conseillé d'utiliser les propriétés ci-dessus. On utilisera plutôt
des méthodes conçues spécifiquement pour chercher un ou plusieurs
éléments.

Il existe une panoplie de méthodes pour chercher un élément dans le DOM.
On se concentrera ici sur deux seules : `querySelector` et
`querySelectorAll`. Libre à vous d'expérimenter avec d'autres, mais
celles-ci sont généralement suffisantes.

### querySelector

La méthode `querySelector` retourne un objet qui représente le _premier_
élément correspondant au sélecteur CSS donné comme argument :

```js
const e1 = document.querySelector("h1 + p"); // <p> suivant directement un <h1>
const e2 = document.querySelector("#foo"); // élément avec l'id foo
const e3 = document.querySelector(".bar span"); // premier <span> dans le premier élément avec la classe bar
```

La méthode `querySelector` peut être appelée à partir de l'objet global
`document` (auquel cas tout le document sera cherché), ou à partir d'un
élément en particulier (auquel cas la recherche sera limitée aux
descendants dudit élément) :

```js
const e4 = e1.querySelector("a"); // premier <a> dans e1
```

### querySelectorAll

La méthode `querySelectorAll` est identique à `querySelector`, hormis le
fait qu'elle retourne un objet `NodeList` qui contient _tous_ les
éléments correspondant au sélecteur CSS donné :

```js
const bodyChildElements = document.querySelectorAll("body > *"); // tous les enfants directs de <body>
console.log(bodyChildElements); // => NodeList [<h1>, <p>]
```

## Créer un élément

La méthode `document.createElement` permet de créer un nouvel élément.
Elle prend en argument le nom de la balise de l'élément à créer, et
retourne un objet du même type :

```js
const p = document.createElement("p");
console.log(p); // => HTMLParagraphElement { ... }
console.log(p.outerHTML); // => "<p></p>"
```

Dans le code ci-dessus, l'identifiant `p` pointe vers un objet
`HTMLParagraphElement` qui représente un élément paragraphe. La
propriété `outerHTML` de cet objet correspond à son balisage.

## Insérer et supprimer des nœuds

> [!IMPORTANT]
> On évite d'utiliser les propriétés `innerHTML` et `outerHTML` pour
> insérer ou supprimer des nœuds. Elles sont moins performantes que les
> méthodes listées ci-dessous et présentent des risques de sécurité. Ces
> propriétés peuvent être utilisées dans les tests automatisés, mais
> jamais dans le code de production.

Un élément créé avec `createElement` n'est pas automatiquement inséré
dans le DOM. Pour qu'un élément apparaisse sur la page, on doit le
connecter à un élément se trouvant déjà dans l'arbre. Pour ce faire, on
utilise des méthodes telles que `prepend` et `append` qui permettent
d'ajouter un ou plusieurs nœuds avant ou après le dernier enfant de
l'élément sur lequel ces méthodes sont appelées :

```js
const span = document.createElement("span");
p.append(span);
console.log(p.outerHTML); // => "<p><span></span></p>"

const i = document.createElement("i");
p.prepend(i);
console.log(p.outerHTML); // => "<p><i></i><span></span></p>"
```

Pour remplacer tous les nœuds enfants d'un élément, ou pour remplacer un
élément du DOM par un autre, on utilise les méthodes `replaceChildren`
et `replaceWith` :

```js
const a = document.createElement("a");
p.replaceChildren(a);
console.log(p.outerHTML); // => "<p><a></a></p>"

const b = document.createElement("b");
a.replaceWith(b);
console.log(p.outerHTML); // => "<p><b></b></p>"
```

La méthode `remove`, quant à elle, permet de retirer un élément du DOM
sans le remplacer par un autre :

```js
b.remove();
console.log(p.outerHTML); // => "<p></p>"
```

> [!IMPORTANT]
> Toutes ces méthodes sont des fonctions de mutation. On ne doit pas les
> invoquer sur des arguments.

Les méthodes `append`, `prepend`, `replaceWith` et `replaceChildren`
sont des fonctions dite **variadiques** qui ont un nombre _variable_ de
paramètres. On peut les appeler avec un argument, deux arguments, trois
arguments, etc.

```js
p.replaceChildren(i, a, b);
console.log(p.outerHTML); // => "<p><i></i><a></a><b></b></p>"
```

Ceci est particulièrement utile lorsqu'on veut insérer tous les éléments
d'une collection dans un autre élément. Considérons par exemple un
tableau qui contient les éléments `i`, `a` et `b` :

```js
const elements = [i, a, b];
```

Plutôt que d'itérer sur ce tableau, on peut utiliser la
[syntaxe de décomposition] pour insérer ses éléments d'un coup :

```js
const div = document.createElement("div");
div.append(...elements);
console.log(div.outerHTML); // => "<div><i></i><a></a><b></b></div>"
```

Dans le code ci-dessus, `...` décompose (_spread_, en anglais) le
tableau `elements` en trois arguments. Voici comment l'expression
`div.append(...elements)` est évaluée étape par étape :

```
div.append(...elements)
div.append(...[i, a, b])
div.append(i, a, b)
```

Notez comment `...` « efface » en quelque sorte les crochets du tableau
afin de passer directement ses éléments en argument.

[syntaxe de décomposition]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax

## Modifier un élément

> [!IMPORTANT]
> Modifier un élément nécessite de muter l'objet qui le représente. On
> ne doit donc pas modifier un élément reçu en argument.

En HTML, on configure le comportement d'un élément grâce à ses
**attributs**. Un contrôle `input`, par exemple, prend différentes
formes selon la valeur de son attribut `type` : `email`, `date`,
`password`, etc. Pareillement, l'attribut `required` rendra le contrôle
obligatoire pour soumettre le formulaire dans lequel il se trouve.

```html
<input type="email" required>
```

En JavaScript, le comportement d'un nœud est configuré grâce à ses
**propriétés**, lesquelles miroitent généralement les attributs de
l'élément :

```js
const input = document.createElement("input");
input.type = "email";
input.required = true;
console.log(input.outerHTML); // '<input type="email" required="">'
```

Ces deux blocs de code (le premier en HTML, le deuxième en JavaScript)
produisent ainsi le même élément dans le DOM.

### Style

> [!IMPORTANT]
> On utilise JavaScript pour définir la valeur d'une propriété de style
> en dernier recours. À moins que la valeur doive être calculée
> dynamiquement, JavaScript devrait plutôt servir à ajouter ou supprimer
> une classe CSS.

En HTML, l'attribut `style` d'un élément permet de définir des règles
CSS de mise en forme qui s'appliquent seulement sur celui-ci :

```html
<p style="color: red">Je serai de couleur rouge.</p>
```

En JavaScript, la valeur de la propriété `style` est un objet de type
`CSSStyleDeclaration` qui contient une liste des propriétés de style
pour l'élément en question :

```js
const p = document.createElement("p");
p.style.color = "red";
console.log(p.outerHTML); // '<p style="color: red"></p>'
```

Ces propriétés de style portent généralement le même nom que leur
contrepartie CSS, à l'exception des propriétés contenant un trait
d'union. Ainsi, la propriété CSS `color` se nomme `color`, mais
`background-color` se traduit en JavaScript par `backgroundColor` :

```js
p.style.backgroundColor = "blue";
console.log(p.outerHTML); // '<p style="color: red; background-color: blue;"></p>'
```

### Classes

La propriété `classList` représente les classes CSS d'un élément HTML.
La valeur de `classList` est un objet de type `DOMTokenList` ayant
plusieurs propriétés pour manipuler la ou les classes de l'élément en
question.

Les méthodes `add` et `remove`, par exemple, permettent respectivement
d'ajouter ou de supprimer une ou plusieurs classes données :

```js
const h1 = document.createElement("h1");
h1.classList.add("foo", "bar");
console.log(h1.outerHTML); // => '<h1 class="foo bar"></h1>'

h1.classList.remove("foo");
console.log(h1.outerHTML); // => '<h1 class="bar"></h1>'
```

Les méthodes `toggle` et `replace` sont également très utiles. Elles
permettent respectivement de basculer une classe donnée, et de remplacer
une classe par une autre :

```js
const h2 = document.createElement("h2");

h2.classList.toggle("foo");
console.log(h2.outerHTML); // '<h2 class="foo"></h2>'

h2.classList.toggle("foo");
console.log(h2.outerHTML); // '<h2 class=""></h2>'

h2.classList.add("foo");
console.log(h2.outerHTML); // '<h2 class="foo"></h2>'
h2.classList.replace("foo", "bar");
console.log(h2.outerHTML); // '<h2 class="bar"></h2>'
```

### Contenu texte

La propriété `textContent` d'un élément HTML permet de consulter et de
modifier le contenu texte de celui-ci :

```js
const span = document.createElement("span");
span.textContent = "exemple";
console.log(span.outerHTML); // '<span>exemple</span>'
console.log(span.textContent); // exemple
```

## Effets de bord

Chercher un ou plusieurs éléments avec `document.querySelector` et
`document.querySelectorAll` constitue un effet de bord puisque le DOM
représente un état _externe_ à notre programme JavaScript. Par
conséquent, une fonction auxiliaire dont le corps contient ces
expressions ne peut pas être testée facilement.

La fonction `hasP` ci-dessous, par exemple, détermine si le document
HTML contient un élément paragraphe :

```js
/**
 * Determines if there's a paragraph element in the document.
 * @returns {boolean}
 */
function hasP() {
    return document.querySelector("p") !== null;
}
```

Cette fonction est _impure_ car elle ne retourne pas toujours le même
résultat pour les mêmes arguments. On ne peut pas valider son
fonctionnement à l'aide de tests automatisés puisque sa valeur de retour
dépend du document HTML qui invoque le script.

Pour cette raison, les méthodes `document.querySelector` et
`document.querySelectorAll` devraient seulement être invoquées dans la
fonction `main` de votre programme. Si une fonction auxiliaire doit
accéder au DOM, mieux vaut lui passer un nœud en argument :

```js
/**
 * Determines if the given parent has a child paragraph element.
 * @param {HTMLElement} parent
 * @returns {boolean}
 */
function hasP(parent) {
    return parent.querySelector("p") !== null;
}

test("should return true if parent has a paragraph child", () => {
    const body = document.createElement("body");
    expect(hasP(body)).toBe(false);

    body.append(document.createElement("p"));
    expect(hasP(body)).toBe(true);
});
```

Cette deuxième version de `hasP` prend un nœud élément en argument, ce
qui nous permet de tester la fonction avec un élément qui n'a pas de
descendant paragraphe, et un autre élément qui en a un. Le résultat de
ces tests dépend seulement de la valeur de `parent`.

> [!NOTE]
> La fonction `test` sert à regrouper le code pour un **cas de test**.
> Elle prend deux arguments : une chaîne qui décrit le résultat attendu,
> et une fonction de rappel. Un cas de test peut inclure plusieurs
> `expect`, mais ils doivent tous valider le même comportement.

Pareillement, une fonction auxiliaire ne devrait jamais insérer des
éléments dans le DOM. Considérons par exemple le code suivant :

```js
/**
 * Creates and append an list item with the given name.
 * @param {string} name
 */
function createLI(name) {
    const li = document.createElement("li");
    li.textContent = name;
    const ul = document.querySelector("ul");
    ul.append(li);
}

createLI("foo");
```

Il est difficile d'écrire un test automatisé pour cette fonction car
elle ne retourne aucune valeur ; son résultat apparaît directement dans
le DOM. De plus, elle ne peut pas être utilisée avec différentes listes.

Lorsque vous concevez une fonction qui crée un ou plusieurs éléments,
retournez toujours ces éléments plutôt que de les insérer directement
dans le DOM. Voici une meilleure version de `createLI` :

```js
/**
 * Creates a list item with the given name.
 * @param {string} name
 * @returns {HTMLLIElement}
 */
function createLI(name) {
    const li = document.createElement("li");
    li.textContent = name;
    return li;
}

expect(createLI("foo").outerHTML).toBe("<li>foo</li>");
expect(createLI("bar").outerHTML).toBe("<li>bar</li>");
```

Non seulement cette version peut-être testée, mais elle peut maintenant
être utilisée par d'autres fonctions auxiliaires. Voici par exemple une
autre fonction qui invoque `createLI` pour créer une liste à partir d'un
tableau de chaînes :

```js
/**
 * Creates an unordered list with the given items.
 * @param {Array<string>} items
 * @returns {HTMLUListElement}
 */
function createUL(items) {
    const ul = document.createElement("ul");
    const lis = items.map(createLI);
    ul.append(...lis);
    return ul;
}

expect(createUL(["foo"]).outerHTML)
    .toBe("<ul><li>foo</li></ul>");
expect(createUL(["foo", "bar"]).outerHTML)
    .toBe("<ul><li>foo</li><li>bar</li></ul>");
```

En résumé, lorsque vous concevez une fonction qui crée un ou plusieurs
éléments, prenez toujours le contenu en argument, et produisez les
éléments comme valeur de retour.
