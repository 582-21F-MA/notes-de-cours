# Propagation

Comme nous avons vu [précédemment][dom], le navigateur se représente un
document HTML comme un arbre enraciné où chaque élément est un nœud.
Tous les nœuds ont un parent, à l'exception de l'élément `<html>` qui
est la racine de l'arbre. 

[dom]:
https://github.com/582-21F-MA/notes-de-cours/tree/main/12_intro-au-dom

Du point du vue du balisage, le parent d'un élément est l'élément dans
lequel il est imbriqué. Dans l'exemple ci-dessous, l'élément `section`
est donc le parent de l'élément `button`.

```html
<section>
    <button>A</button>
</section>
```

Puisque l'élément `section` *inclut* en quelque sorte l'élément
`button`, lorsqu'on clique sur le bouton, on clique aussi inévitablement
sur la section. Pour cette raison, étant donné un gestionnaire
d'événement sur le bouton et un autre sur la section, les deux seront
appelés lorsqu'un utilisateur ou une utilisatrice clique sur le bouton.
On nomme se phénomène « propagation », ou « *bubbling* » en anglais.

```ts
const section = document.querySelector("section") as HTMLElement;
const button = document.querySelector("button") as HTMLButtonElement;

form.addEventListener("click", () => console.log("section cliqué"));
button.addEventListener("click", () => console.log("bouton cliqué"));
```

## Trier les événements

La propagation est particulièrement utile lorsqu'on veut écouter un même
événement sur plusieurs éléments différents. Plutôt que d'enregistrer
plusieurs gestionnaires (à savoir, un gestionnaire par élément), on
enregistra un seul gestionnaire sur le parent des éléments visés.

Considérons par exemple le balisage suivant :

```html
<section>
    <button>A</button>
    <button>B</button>
    <button>C</button>
</section>
```

Pour afficher dans la console la lettre sur laquelle l'utilisateur ou
l'utilisatrice a cliquée, on enregistrera d'abord un gestionnaire sur la
section. 

```ts
const section = document.querySelector("section") as HTMLElement;
section.addEventListener("click", handleClick);
```

Puis, à l'intérieur du gestionnaire, on triera les événements de sorte à
ignorer les cliques qui ne sont pas directement sur les boutons. Pour ce
faire, on utilisera la propriété `target`, laquelle correspond à
l'élément cliqué, ainsi que la propriété `nodeName` dont la valeur est
le nom de la balise en majuscule.

```ts
function handleClick(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (element.nodeName !== "BUTTON") return; // triage
    console.log(element.textContent);
}
```

## Stopper la propagation

La propagation d'un événement ne s'arrête pas au parent de l'élément où
l'événement s'est produit. Un événement se propagera de parent en parent
jusqu'à ce qu'il atteigne la racine du document. Même les gestionnaires
d'événement enregistrés sur la fenêtre du navigateur (l'objet global
`window`) ont accès aux événements qui se produisent plus bas dans
l'arbre du DOM.

La seule façon d'arrêter la propagation d'un événement est d'appeler la
méthode `stopPropagation` sur l'objet qui représente l'événement en
question (c'est-à-dire l'objet `Event`, ou `MouseEvent`, etc.). Stopper
la propagation peut être nécessaire, par exemple, lorsqu'un bouton se
trouve dans un autre élément qui doit lui aussi réagir aux cliques des
utilisateur·rices.

```ts
function handleClick(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (element.nodeName !== "BUTTON") return;
    console.log(element.textContent);
    element.stopPropagation(); // stop la propagation
}
```

