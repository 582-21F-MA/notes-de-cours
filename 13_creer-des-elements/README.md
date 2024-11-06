# Créer des éléments

En plus de modifier des éléments qui se trouvent déjà dans le DOM,
JavaScript permet aussi de créer de nouveaux éléments, et de les insérer
dans un document HTML. Pour ce faire, on utilise la méthode
`createElement` de l'objet global `document`.

```ts
const p = document.createElement("p");
console.log(p); // => HTMLParagraphElement { ... }
```

La méthode `createElement` crée un élément HTML dont le type correspond
au nom de la balise spécifié comme argument. Elle retourne un objet qui
représente l'élément créé.

> [!CAUTION]
> Quoiqu'on puisse techniquement créer une page web entière avec les
> fonctions qui suivent, JavaScript devrait être utilisé seulement pour
> les éléments *dynamiques* d'une page. Voir les notes sur
> l'amélioration progressive.

## Ajouter des éléments au DOM

Un élément créé avec `createElement` n'est pas automatiquement inséré
dans le DOM. Pour ce faire, on doit connecter notre nœud à un nœud se
trouvant déjà dans le document. Plusieurs méthodes permettent de faire
ceci. On se concentrera ici sur `prepend` et `append`, lesquelles
permettent respectivement d'ajouter un ou plusieurs nœuds donnés avant
ou après le dernier enfant de l'élément sur lequel ces méthodes sont
appelées.

```ts
const span = document.createElement("span");
p.append(span);
console.log(p.outerHTML); // "<p><span></span></p>"

const i = document.createElement("i");
p.prepend(i);
console.log(p.outerHTML); // "<p><i></i><span></span></p>"
```

## Remplacer des éléments

Il est parfois nécessaire de remplacer un élément du DOM par un autre,
ou bien de remplacer tous les nœuds enfants d'un élément en particulier.
Pour ce faire, on utilise les méthodes `replaceWith` et
`replaceChildren`.

```ts
const b = document.createElement("b");
span.replaceWith(b);
console.log(p.outerHTML); // "<p><i></i><b></b></p>"

const a = document.createElement("a");
p.replaceChildren(a);
console.log(p.outerHTML); // "<p><a></a></p>"
```

Le méthode `remove`, quant à elle, permet de retirer l'élément courant
du DOM sans le remplacer par un autre.

```ts
a.remove();
console.log(p.outerHTML); // "<p></p>"
```
