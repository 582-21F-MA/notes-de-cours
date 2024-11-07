# JavaScript et le navigateur

JavaScript est un langage de programmation conçu d'abord et avant tout
pour être interpréter par un navigateur. Rien n'est plus facile que
d'exécuter du code JavaScript dans ce dernier. Il suffit de placer le
code entre les balises `<script>`, et voilà !

```html
<script>
    console.log("Et voilà !");
</script>
```

L'instruction ci-dessus sera exécutée dès que le navigateur lira le
contenu des balises `<script>`.

Pour accéder à la console, il faudra ouvrir les outils de développement
du navigateur. Selon le navigateur que vous utilisez, vous pouvez
cliquer sur le menu `Inspecteur` ou appuyer sur les touches `Option +
CMD/CTRL + I`. Un onglet « Console » devrait se trouver dans la fenêtre
qui apparaîtra.

## Attribut src

Quoique facile et rapide, inclure des programmes JavaScript directement
dans un document HTML est toutefois une pratique à proscrire. Plutôt on
placera notre code JavaScript dans un fichier séparé, et on indiquera au
navigateur le chemin vers celui-ci avec l'attribut `src`, un peu comme
pour les images et les feuilles de style.

```html
<head>
    <script src="main.js" type="module"></script>
</head>
```

Vous remarquerez que nous indiquons aussi le type du script comme étant
`module`. Autrement, il sera impossible d'importer notre cadre de tests.
Les scripts de type « module » ont aussi l'avantage d'être *différé*.
C'est-à-dire que le navigateur exécutera ceux-ci seulement après
l'analyse complète du document HTML.

## Serveur

Pour des raisons de sécurité, la plupart des navigateurs bloquent
l'accès aux modules JavaScript si ceux-ci ne proviennent pas de réponses
HTTP. Pour exécuter vos programmes dans le navigateur, il vous faudra
donc démarrer au préalable un serveur HTTP.

L'interface en ligne de commande de l'interpréteur PHP inclut un tel
serveur de fichiers. Pour le lancer, il suffit d'exécuter la commande
suivante à la racine de votre projet :

```sh
php -S localhost:8000
```

Si un message d'erreur quant au *port* s'affiche dans le terminal, vous
pouvez changer celui-ci en modifiant le nombre après les deux-points.
