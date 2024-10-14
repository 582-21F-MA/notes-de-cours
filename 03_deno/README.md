# Deno

Originalement, l'environnement d'exécution de JavaScript était le
navigateur web. C'est d'ailleurs toujours le cas aujourd'hui. À la
différence des autres langages de programmation, un programme JavaScript
n'est pas exécuté à partir de la ligne de commande. Plutôt, c'est la
responsabilité du navigateur web d'interpréter le code source.

Depuis 2010, plusieurs autres environnements d'exécution sont toutefois
disponibles. Au lieu de limiter JavaScript à l'interface du navigateur
web, des plateformes telles que Node, Deno et Bun permettent d'accéder à
l'ensemble du système d'exploitation, permettant ainsi d'exécuter les
programmes JavaScript à partir du terminal.

Ce cours étant un cours de programmation côté client, la plupart de nos
programmes seront exécutés dans un navigateur web. Cela étant dit, à des
fins d'apprentissage, il est parfois utile d'avoir accès à un autre
environnement d'exécution. Lorsque ce sera le cas, nous utiliserons
Deno.

Les créateurs de Deno sont les mêmes que ceux de Node, le premier
environnement d'exécution de JavaScript en dehors du navigateur web.
Quoique Node soit à ce jour plus populaire, Deno est utilisé dans ce
cours car il est capable d'interpréter TypeScript nativement, et qu'il
inclus tout les outils nécessaires pour écrire un programme : formatage,
analyse statique, cadre de test, etc. De plus, à la différence de Node,
Deno utilise les mêmes interfaces de programmation standardisées que les
navigateurs Web. Autrement dit, à quelques exceptions près, un programme
peut autant être exécuté dans un navigateur web qu'avec Deno.

## Installation

La façon la plus simple d'installer Deno est d'utiliser le gestionnaire
de paquets préconisé par votre plateforme. On suggère Scoop sur Windows
et Homebrew sur Mac. Sur Linux, cela dépend de votre distribution.

Windows :

```sh
scoop install deno
```

Mac :

```sh
brew install deno
```

## Utilisation

Pour exécuter un fichier JavaScript ou TypeScript avec Deno, il suffit
d'exécuter la commande `deno run --check --allow-all` suivie du chemin
vers le fichier à exécuter. L'option `--check` indique à Deno de valider
le typage. L'option `--allow-all` permet à Deno d'effectuer des requêtes
HTTP, ce qui sera nécessaire pour importer note cadre de test. Pour
exécuter un fichier de nouveau à chaque fois que celui-ci change, vous
pouvez ajouter le drapeau `--watch`.

```sh
deno run --check --allow-all --watch main.ts
```

Vous devriez également placer le fichier de configuration `deno.json`
ci-joint à la racine du répertoire où se trouve votre programme. Quoique
ce fichier de configuration n'est pas obligatoire, il assure que Deno
exécute le code source de la même façon que le transcompilateur
TypeScript.
