# Événements

Dans un navigateur web, les événements sont des occurrences rattachés à
un élément spécifique, et auxquels un programme JavaScript peut
répondre. Il existe plusieurs types d'événements : par exemple,
lorsqu'un ou une utilisatrice clique sur un bouton, lorsqu'il ou elle
appuie sur une touche de clavier, lorsqu'un formulaire est soumis,
lorsqu'un contrôle reçoit le focus, etc.

## Gestionnaire d'événements

Pour répondre à un type d'événement, il faut enregistrer un gestionnaire
d'événements pour celui-ci. Un gestionnaire d'événements est une
fonction de rappel que nous définissons, et qui est appelée
automatiquement par le navigateur lorsque l'événement se produit.
Puisqu'un événement est rattaché à un élément spécifique, on enregistre
le gestionnaire sur l'élément directement.

Considérons par exemple un bouton qui se trouve sur une page web : 

```html
<button>Cliquez moi</button>
```

Pour enregistrer un gestionnaire d'événement, il faut d'abord une
référence au bouton. Ensuite, on utilise la méthode `addEventListener`
pour enregistrer le gestionnaire. La méthode `addEventListener` prend
deux arguments : le nom du type d'événement auquel on désire répondre,
et la fonction de rappel.

```ts
const button = document.querySelector("button") as HTMLButtonElement;

button.addEventListener("click", handleClick);

function handleClick(): void {
    console.log("Cliqué!");
}
```

Lorsque le navigateur appelle la fonction de rappel, il lui donne comme
argument un objet représentant l'événement qui s'est produit. Le type de
l'objet varie selon le type d'événement (vous trouverez une [liste des
différents types][MDN] sur MDN), mais la plupart du temps l'objet est de
type `Event`. L'objet `Event` contient des informations à propos de
l'événement en question. Par exemple, la propriété `currentTarget`
contient une référence à l'élément sur lequel le gestionnaire
d'événement a été enregistré.

[MDN]:
https://developer.mozilla.org/fr/docs/Web/API/Event#interfaces_basées_sur_event

```ts
function handleClick(e: Event): void {
    console.log(e); // => <button>Cliquez moi</button>
}
```

Nous aborderons plus en détails les diverses propriétés des objets qui
représentent un événement.
