# Événements

Dans un navigateur Web, les **événements** sont des occurrences
rattachées à un élément spécifique, et auxquels un programme JavaScript
peut répondre. Il existe plusieurs types d'événements : cliquer sur un
bouton (_click_), appuyer sur une touche de clavier (_keydown_),
soumettre un formulaire (_submit_), donner le focus à un contrôle
(_focus_), etc.

Pour répondre à un type d'événement, il faut enregistrer un
**gestionnaire d'événements** pour celui-ci. Un gestionnaire
d'événements est une fonction de rappel que nous définissons, et qui est
appelée automatiquement par le navigateur lorsque l'événement se
produit. Puisqu'un événement est rattaché à un élément spécifique, on
enregistre le gestionnaire sur cet élément.

Considérons par exemple un bouton qui affiche un message dans une boîte
de dialogue lorsque l'utilisateur·rice clique sur celui-ci. D'abord, il
faut créer le bouton :

```js
const button = document.createElement("button");
button.textContent = "Cliquez ici !";
```

Ensuite, on enregistre un gestionnaire d'événement sur celui-ci avec la
méthode `addEventListener`, qui prend deux arguments :

- le type d'événement auquel on désire répondre, et
- la fonction de rappel qui représente le gestionnaire.

```js
button.addEventListener("click", () => alert("Cliqué"));
//                      -------  ---------------------
//                      type     gestionnaire
```

Une fois le bouton ajouté au DOM, le gestionnaire sera appelé
automatiquement à chaque fois qu'on clique dessus.

## Objet événement

Un gestionnaire d'événement peut prendre comme argument un objet
représentant l'événement qui s'est produit. Le type de cet objet dépend
du type d'événement. Pour les événements qui se produisent lors d'une
interaction avec un appareil de pointage, par exemple, l'objet est de
type `MouseEvent`. Vous trouverez la
[liste des différents types sur MDN].

Dans le corps du gestionnaire, on utilise cet objet pour obtenir des
informations à propos de l'événement en question. Ainsi, la propriété
`button` d'un objet `MouseEvent` nous permet de savoir sur quel bouton
de la souris l'utilisateur·rice a cliqué :

```js
button.addEventListener("click", (event) => {
    switch (event.button) {
        case 0:
            alert("Left button clicked.");
            break;
        case 1:
            alert("Middle button clicked.");
            break;
        case 2:
            alert("Right button clicked.");
            break;
        default:
            alert(`Unknown button code: ${event.button}`);
    }
});
```

[liste des différents types sur MDN]: https://developer.mozilla.org/fr/docs/Web/API/Event#interfaces_bas%C3%A9es_sur_event

## Tester un gestionnaire d'événements

Un gestionnaire d'événement est une fonction de rappel qui ne retourne
jamais rien. Par conséquent, il est difficile de valider son bon
fonctionnement à l'aide de tests automatisés. Plutôt que de tester
directement le gestionnaire, on testera donc la fonction qui retourne
l'élément sur lequel le gestionnaire est enregistré.

Prenons par exemple une fonction qui retourne un bouton dont le contenu
texte alterne entre `"on"` et `"off"` lorsqu'on clique dessus :

```js
/**
 * Returns a button that switches between on and off when clicked.
 * @returns {HTMLButtonElement}
 */
function createSwitch() {
    const button = document.createElement("button");
    button.textContent = "on";
    button.addEventListener(
        "click",
        () =>
            button.textContent = button.textContent === "on"
                ? "off"
                : "on",
    );
    return button;
}
```

Pour tester la fonction `createSwitch`, on doit s'assurer

1. que le contenu texte initial du bouton soit `"on"`,
2. que le contenu texte du bouton soit `"off"` après un premier clic, et
3. que le contenu texte du bouton soit `"on"` après un deuxième clique.

Voici comment écrire ces tests avec `test` et `expect` :

```js
test("switch between on and off when clicked", () => {
    const button = createSwitch();
    expect(button.textContent).toBe("on");
    button.dispatchEvent(new MouseEvent("click"));
    expect(button.textContent).toBe("off");
    button.dispatchEvent(new MouseEvent("click"));
    expect(button.textContent).toBe("on");
});
```

Pour simuler un clic de l'utilisateur·rice, on invoque la méthode
`dispatchEvent`, qui prend comme argument l'objet événement à
déclencher.

## Propagation et délégation

Comme nous avons vu précédemment, le navigateur se représente un
document HTML comme un arbre enraciné où chaque élément est un nœud, et
où tous les nœuds ont un parent, à l'exception de l'élément `<html>`. Du
point de vue du balisage, le parent d'un élément est l'élément dans
lequel il est imbriqué. Dans le code ci-dessous, par exemple, l'élément
`<section>` est le parent des éléments `<button>` :

```html
<section>
    <button>A</button>
    <button>B</button>
    <button>C</button>
</section>
```

Puisque `<section>` _inclut_ en quelque sorte les `<button>`, lorsqu'on
clique sur un bouton, on clique aussi inévitablement sur la section.
Pour cette raison, étant donné un gestionnaire d'événement sur le bouton
et un autre sur la section, les deux seront appelés lorsqu'on clique sur
le bouton. On nomme ce phénomène **propagation** (_bubbling_ en
anglais).

Le code ci-dessous démontre comment _un seul événement_ peut ainsi
causer l'invocation de _plusieurs gestionnaires_ :

```js
const section = document.querySelector("section");
const buttons = document.querySelectorAll("button");

const results = [];

section.addEventListener("click", () => results.push("section"));
buttons[0].addEventListener("click", () => results.push("button"));

buttons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
expect(results).toEqual(["button", "section"]);
```

> [!NOTE]
> Par défaut, les événements créés avec un constructeur comme `Event` ou
> `MouseEvent` ne se propagent pas. C'est pourquoi on passe l'objet
> `{ bubbles: true }` comme deuxième argument.

Notez que le gestionnaire sur le bouton est appelé en premier car les
événements se propagent toujours vers le haut.

La propagation est utile lorsqu'on veut réagir à un même événement qui
peut se produire sur plusieurs éléments différents. Plutôt que
d'enregistrer plusieurs gestionnaires (à savoir, un gestionnaire par
élément), on enregistrera un seul gestionnaire sur le parent des
éléments visés. Cette technique se nomme la **délégation d'événements**.

Voici un exemple :

```js
let letter = "";

section.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    letter = event.target.textContent;
});

buttons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
expect(letter).toBe("A");
buttons[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
expect(letter).toBe("B");
buttons[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));
expect(letter).toBe("C");
```

Dans le code ci-dessus, on enregistre un seul gestionnaire sur la
`<section>` dans laquelle se trouvent les `<button>`. Lorsqu'il est
invoqué, le gestionnaire s'assure d'abord que l'élément cliqué
(`event.target`) est un bouton. Pour ce faire, on effectue un retour
anticipé si l'élément ciblé n'est pas un objet de type
`HTMLButtonElement`. Lorsque la cible est bel et bien un bouton, on
affecte son contenu texte à la variable `letter`.

Notez que, si on ne filtre pas d'abord les événements, la valeur de
`letter` sera toujours `"ABC"` puisque le gestionnaire sera toujours
appelé sur la `<section>` après avoir été appelé sur le `<button>`.
Quoiqu'on puisse stopper la propagation d'un événement avec la méthode
`stopPropagation`, mieux vaut filtrer les événements lorsqu'on utilise
la délégation d'événements. Autrement, on risque d'obtenir des résultats
inattendus — par exemple, en cliquant dans la marge entre les boutons.
