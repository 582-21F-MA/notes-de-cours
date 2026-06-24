# Formulaires

Les formulaires HTML permettent de saisir des données. Ces données
peuvent être traitées et stockées par un serveur, ou utilisées côté
client pour améliorer l'expérience utilisateur·rice.

Un formulaire est fait de **contrôles** dans lesquels sont saisies les
données. Ces contrôles prennent la forme de zones de texte (`<input>`,
`<textarea>`), de boîtes à sélection (`<select>`), de cases à cocher
(`<input type="checkbox">`), de boutons radio (`<input type="radio">`),
etc. Un contrôle doit _toujours_ être associé à un **libellé**
(`<label>`) qui décrit le rôle du contrôle. Ces libellés sont
indispensables pour assurer l'accessibilité du formulaire.

> [!NOTE]
> L'attribut `placeholder` correspond au texte affiché dans un contrôle
> vide. Il sert à donner un indice quant aux données attendues. Il ne
> remplace pas le libellé.

## Envoyer les données au serveur

> [!NOTE]
> Cette section suppose que vous êtes déjà familier·ère avec HTTP. Si ce
> n'est pas le cas, nous vous suggérons de lire
> [HTTP: Learn Your Browser's Language].

Un formulaire HTML n'est rien d'autre qu'un moyen de configurer une
requête HTTP. Lorsqu'un formulaire est soumis, une requête dont la
méthode correspond à l'attribut `method` est envoyée vers l'URL indiquée
par l'attribut `action`.

Par exemple, voici un formulaire qui envoie une requête GET vers l'URL
`/products` :

```html
<form method="get" action="/products">
    <label>
        Search
        <input type="search" name="query" />
    </label>
    <label>
        Sort
        <select name="order">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </label>
    <button type="submit">Submit</button>
</form>
```

Puisque la valeur de l'attribut `method` est `get`, les données du
formulaire sont ajoutées à la **chaîne de requête** de l'URL. Voici à
quoi ressemble une requête envoyée avec ce formulaire :

```
GET /products?query=foo&order=asc
Host: example.com
```

Notez que les données sont envoyées sous forme de paires `clé=valeur`.
La clé correspond à l'attribut `name` des contrôles, et les paires sont
séparées par une éperluette (`&`).

Voici un formulaire qui envoie une requête POST vers l'URL `/login` :

```html
<form method="post" action="/login">
    <label>
        Email
        <input type="email" name="email" required />
    </label>
    <label>
        Password
        <input type="password" name="password" required />
    </label>
    <button type="submit">Submit</button>
</form>
```

Puisque la valeur de l'attribut `method` est `post`, les données du
formulaire sont ajoutées au corps de la requête. Voici à quoi ressemble
une requête envoyée avec ce formulaire :

```
POST /login
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 35

email=foo%40bar.com&password=abc123
```

[HTTP: Learn Your Browser's Language]: https://drive.google.com/file/d/1WVurFlN-8Ox9FRTLBCRqjEP_6xSYX-yc/view?usp=sharing

## Accéder aux données côté client

Pour accéder aux données d'un formulaire côté client, on utilise le DOM
et les événements.

L'événement `submit` correspond à la soumission d'un formulaire. Il est
déclenché lorsqu'on clique sur un bouton de soumission ou qu'on appuie
sur la touche RETOUR du clavier.

```js
const form = document.querySelector("form");
form.addEventListener("submit", () => console.log("Submitted"));
```

> [!NOTE]
> Évitez d'enregistrer des gestionnaires pour les clics du bouton de
> soumission. Sinon, vos gestionnaires ne seront pas exécutés lorsque
> l'utilisateur·rice appuiera sur la touche RETOUR du clavier.

On peut prévenir l'envoi de la requête HTTP (et ainsi éviter le
chargement d'une nouvelle page) grâce à la méthode `preventDefault` :

```js
form.addEventListener("submit", event => {
    event.preventDefault();
    // gestion du formulaire côté client...
});
```

Pour récupérer les données, on utilise un objet `FormData`, dont le
fonctionnement est similaire à celui d'une `Map` :

```js
form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const email = data.get("email");
    const password = data.get("password");
});
```

Des événements sont aussi déclenchés par les contrôles, et ce, sans
avoir à soumettre le formulaire :

```js
const input = document.createElement("input");
input.addEventListener("focus", () => console.log("Gained focus"));
input.addEventListener("input", () => console.log("Value changed"));
input.addEventListener("change", () => console.log("Value applied"));
input.addEventListener("blur", () => console.log("Lost focus"));
```

Vous trouverez [ici][démo événements] une démonstration qui explique
bien la différence entre ces événements.

[démo événements]: https://stackoverflow.com/a/69167655
