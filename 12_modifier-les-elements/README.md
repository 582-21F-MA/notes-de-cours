# Modifier les éléments

En HTML, le comportement d'un élément est configuré grace à ses
*attributs*. Un contrôle `input` par exemple, prend différentes formes
selon la valeur de son attribut `type`. Pareillement, l'attribut
`required` rendra le contrôle obligatoire pour soumettre le formulaire
dans lequel il se trouve.

```html
<input type="email" required>
```

En JavaScript, le comportement de l'objet qui représente un élément est
configuré grace à ses *propriétés*, lesquelles miroitent généralement
les attributs de l'élément en question.

```ts
const input = document.createElement("input");
input.type = "email";
input.required = true;
console.log(input.outerHTML); // '<input type="email" required="">'
```

Comme vous pouvez voir, ces deux blocs de code (le premier en HTML, le
deuxième en JavaScript) produiront exactement le même élément.

> [!NOTE]
> Pour simplifier le code, les exemples utilisent la méthode
> `createElement` qui créer un nouvel élément, et la propriété
> `outerHTML` dont la valeur représente le balisage qui correspond à
> l'élément. Ces propriétés seront davantage expliquées plus tard.

## Style

En HTML, l'attribut `style` d'un élément permet de définir des règles
CSS de mise en forme qui s'appliquent seulement sur celui-ci.

```html
<p style="color: red">Je serai de couleur rouge.</p>
```

En JavaScript, la valeur de la propriété `style` est un objet de type
`CSSStyleDeclaration` qui contient une liste des propriétés de style
pour l'élément en question. Ces propriétés de style portent généralement
le même nom que leur contrepartie CSS, à l'exception des propriétés
contenant un trait d'union. Ainsi, la propriété CSS `color` se nomme
`color`, mais `background-color` se traduit en JavaScript par
`backgroundColor`.

```ts
const p = document.createElement("p");
p.style.color = "red";
p.style.backgroundColor = "blue";
console.log(p.outerHTML); // '<p style="color: red; background-color: blue;"></p>'
```

## Classes

La propriété `classList` représente les classes CSS d'un élément HTML
donné. La valeur de `classList` est un objet de type `DOMTokenList`
ayant plusieurs propriétés pour manipuler la ou les classes de l'élément
en question.

Les méthodes `add`  et `remove`, par exemple, permettent respectivement
d'ajouter ou de supprimer une ou plusieurs classes données.

```ts
const h1 = document.createElement("h1");
h1.classList.add("foo", "bar");
console.log(h1.outerHTML); // => '<h1 class="foo bar"></h1>'

h1.classList.remove("foo");
console.log(h1.outerHTML); // => '<h1 class="bar"></h1>'
```

Les méthodes `toggle` et `replace` sont également très utiles. Elles
permettent respectivement de basculer une classe donnée, et de remplacer
une classe par une autre;

```ts
const h2 = document.createElement("h2");
h2.classList.toggle("foo");
console.log(h2.outerHTML); // '<h2 class="foo"></h2>'
h2.classList.toggle("foo");
console.log(h2.outerHTML); // '<h2 class=""></h2>'

h2.classList.add("foo");
h2.classList.replace("foo", "bar");
console.log(h2.outerHTML); // '<h2 class="bar"></h2>'
```

## Contenu d'un élément

La propriété `textContent` d'un élément HTML permet de consulter et de
modifier le contenu de celui-ci.

```ts
const span = document.createElement("span");
span.textContent = "exemple";
console.log(span.outerHTML);   // '<span>exemple</span>'
console.log(span.textContent); // exemple
```
