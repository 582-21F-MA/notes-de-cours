# Formulaires

Les formulaires HTML sont un des vecteurs principaux par lesquels les
utilisateur·rices interagissent avec un site web. Ils permettent
d'envoyer des données au serveur, mais leur contenu peut aussi être
intercepté par JavaScript afin d'être utilisé côté client.

Un formulaire est un ensemble de *contrôles* qui permettent aux
utilisateur·rices d'entrer des données. Ces contrôles prennent la forme
de zones de textes (`<input>`, `<textarea>`), de boîtes à sélection
(`<select>`), de cases à cocher (`<input type="checkbox">`) ou de
boutons radio (`<input type="radio">`). Un contrôle est toujours associé
à un libellé (`<label>`) qui décrit le rôle du contrôle. Ces libellés
sont indispensables pour assurer l'accessibilité du formulaire.

Un formulaire est envoyé au serveur lorsque l'utilisateur·rice clique
sur le `<bouton>` qui se trouve à l'intérieur du formulaire. Par défaut,
les données sont encodées dans l'URL de la requête. Si la valeur de
l'attribut `method` du formulaire est `POST`, alors les données sont
encodées dans le corps de la requête. L'attribut `name` d'un contrôle
indique au serveur à quoi correspond la valeur (`value`) de celui-ci.

```html
<form method="POST" action="/login">
    <label>
        Courriel
        <input type="email" name="email" required />
    </label> 
    <label>
        Mot de passe
        <input type="password" name="password" required />
    </label> 
    <button>Se connecter</button>
</form>
```

Le formulaire ci-dessus, par exemple, enverra au serveur une requête
POST dont le chemin est `/login`. Si le courriel entré est `foo@bar.com`
et le mot de passe `abc123`, alors le corps de la réponse sera : 

```
email=foo@bar.com&password=abc123
```

## Événements des formulaires

Lorsqu'un ou une utilisatrice tente de soumettre un formulaire,
l'événement `submit` est lancé par le celui-ci. Le type de l'objet qui
représente l'événement est `SubmitEvent`. La méthode `preventDefault`
est utilisée pour prévenir la soumission d'un formulaire.

```ts
const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", handleSubmit);

function handleSubmit(event: SubmitEvent): void {
    event.preventDefault():
}
```

Il est préférable d'écouter la soumission du formulaire plutôt que le
clique sur le bouton de soumission. Désactiver le bouton n'empêche pas
les utilisateur·rices de soumettre le formulaire en appuyant sur la
touche `return` de leur clavier. De plus, la validation du formulaire
est effectuée par le navigateur lors de la soumission, et non lorsqu'on
clique sur le bouton.

Des événements sont aussi lancés par les contrôles, et ce, sans avoir à
soumettre le formulaire :

-   `focus` est lancé lorsque le contrôle reçoit le focus ;
-   `input` est lancé à chaque modification unitaire de la valeur du
    contrôle ;
-   `change` est lancé lorsque le changement de la valeur est appliqué ;
    et
-   `blur` est lancé lorsque le contrôle perd le focus.

Vous trouverez [ici][démo événements] une démonstration qui explique
bien la différence entre chaque événement (exécutez l'extrait de code en
bas de la réponse).

[démo événements]: https://stackoverflow.com/a/69167655

## Validation des données

Ce n'est pas tout de permettre aux utilisateur·rices d'entrer des
données — il faut aussi valider que le format de ces données est
correct. On doit s'assurer que les champs obligatoires ne sont pas
vides, que l'adresse email entrée est valide, que le mot de passe
contient au moins une majuscule et un chiffre, etc.

Il y a deux types de validation de données sur le web : 

La validation côté client est la validation effectuée dans le
navigateur, avant que les données soient envoyées au serveur. On
considère parfois ce type de validation comme étant plus conviviale car
elle donne de la rétroaction instantanément et de façon plus granulaire.

La validation côté serveur est la validation opérée par le serveur après
que les données aillent été soumises, mais avant que celles-ci soient
sauvegardées dans une base de données. Si les données sont erronées, le
serveur envoie une réponse avec un code d'erreur au client. La réponse
du serveur prend généralement la forme du même formulaire, plus des
messages indiquant les erreurs à corriger.

Techniquement, la validation côté client est facultative, tandis que
celle côté serveur est indispensable. Il est assez facile de contourner
la validation côté client (en désactivant JavaScript, par exemple, ou en
modifiant manuellement le balisage). Ce n'est pas le cas pour la
validation côté serveur, car les utilisateur·rices n'ont pas accès au
code du serveur.

### Validation intégrée avec HTML

Puisque la validation côté client est facultative, on approchera
celle-ci comme une forme d'amélioration progressive. Son but est de
rendre plus agréable l'expérience des utilisateur·rices, mais le bon
fonctionnement du site web ne doit pas en dépendre.

Le principe de l'amélioration progressive est de s'assurer d'abord qu'un
site web fonctionne seulement avec HTML. Heureusement, HTML inclus
plusieurs attributs qui permettent de valider les contrôles. L'attribut
`required`, par exemple, rend un champs obligatoire. Les attributs
`minlength` et `maxlength` peuvent limiter la taille d'une entrée texte.
Les attributes `min` et `max` définissent le minimum et la maximum des
champs numériques. L'attribut `pattern` permet d'utiliser une [expression
régulière][] pour spécifier les valeurs qui sont acceptables.

[expression régulière]:
https://fr.wikipedia.org/wiki/Expression_régulière

### Retour visuel avec CSS

Un contrôle dont la valeur satisfait les exigences des attributs
ci-dessus est considéré comme étant valide. Sinon, le contrôle est
invalide.

On utilise les peudo-classes CSS `:valid` et `:invalid` pour
appliquer une composition de style à un contrôle selon s'il est valide
ou non.

### Validation intégrée avec JavaScript

Les objets JavaScript qui représentent les contrôles d'un formulaire
possèdent des [propriétés][API validation] liées à la validation
intégrée. Ces propriétés permettent de gérer la validation de formulaire
en JavaScript, et donc de personnaliser davantage la rétroaction faite à
l'utilisateur ou l'utilisatrice.

Pour personnaliser l'affichage des messages d'erreur avec JavaScript, on
doit souvent désactivé la validation faite par le navigateur. Pour ce
faire, on ajoute l'attribut `novalidate` au formulaire. Ajoutez
toujours cet attribut à l'aide de JavaScript, et non directement dans le
document HTML. De cette façon, si JavaScript est indisponible, les
utilisateur·rices auront tout de même accès aux messages d'erreur du
navigateur.

Enfin, si vous affichez dynamiquement des messages d'erreur,
assurez-vous que l'élément dans lequel apparaît ces messages a
l'attribut `aria-live="polite"`. Autrement, les utilisateur·rices qui
utilisent des lecteurs d'écran ne seront pas notifié·es.

[API validation]:
https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation#api_de_contraintes_de_validation_html5
