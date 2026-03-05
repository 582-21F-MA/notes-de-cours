# JavaScript

**JavaScript** est le langage de programmation du web. La majorité des
sites web utilisent JavaScript, et tous les navigateurs web modernes
incluent un interpréteur JavaScript.

JavaScript est un langage de programmation dynamique, adapté autant à la
programmation orientée objet qu'à la programmation fonctionnelle. Malgré
son nom, il n'a presque rien à voir avec le langage de programmation
Java. Le nom « JavaScript » est un coup publicitaire qui remonte à la
création du langage en 1995, période durant laquelle Java gagnait en
popularité.

JavaScript ressemble davantage aux langages de programmation Scheme
(duquel il tire ses fonctions de première classe), et Self (duquel il
héritage sa chaîne de prototypes). JavaScript possède d'ailleurs un
autre nom : **ECMAScript**, d'après l'organisation Ecma International
(_European Computer Manufacturers Association_) qui est responsable de
sa standardisation.

## Exécuter un programme JavaScript

JavaScript est un langage de programmation conçu d'abord et avant tout
pour être interpréter par un navigateur tel que Firefox, Chrome ou
Safari. Rien n'est plus facile que d'exécuter du code JavaScript dans un
navigateur : il suffit de placer le code dans un document HTML, entre
les balises `<script>`, et voilà !

```html
<script>
    console.log("Et voilà !");
</script>
```

Le code JavaScript ci-dessus sera exécuté dès que le navigateur lira le
contenu des balises `<script>`. Le message s'affichera dans la console
qui se trouve dans les outils de développement du navigateur.

Quoique facile et rapide, inclure des programmes JavaScript directement
dans un document HTML est une pratique à proscrire. Plutôt, on placera
le code dans un fichier séparé, et on indiquera au navigateur la URL de
celui-ci avec l'attribut `src`, un peu comme pour les images et les
feuilles de style.

```html
<head>
    <script src="main.js" defer></script>
</head>
```

Nous ajoutons l'attribut `defer` afin que l'exécution du programme soit
_différés_ ; c'est-à-dire que le navigateur exécutera celui-ci seulement
après l'analyse complète du document HTML. Sinon, le programme ne pourra
pas se référer aux divers éléments présents dans le document.

> [!NOTE]
> Avant l'introduction de l'attribut `defer`, on plaçait les balises
> `<script>` à la fin du document HTML pour contrer ce problème.
> Aujourd'hui, on évite cette pratique car elle empêche le navigateur de
> télécharger les scripts en parallèle.
