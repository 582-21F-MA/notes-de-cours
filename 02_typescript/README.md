# TypeScript

TypeScript est un sur-ensemble syntaxique de JavaScript qui permet un
typage statique des variables et des fonctions. Tout code JavaScript
correct est aussi du code TypeScript correct. Cependant, un programme
TypeScript doit être transcompilé (ou traduit) en JavaScript avant de
pouvoir être interprété par un navigateur web. 

De par sa nature plus stricte, TypeScript est généralement préféré à
JavaScript pour les projets d'envergure. TypeScript permet également
d'annoter le type des valeurs d'un programme, et ainsi rendre la lecture
et la compréhension du code plus facile. C'est pourquoi nous utiliserons
celui-ci dans ce cours.

## Installation

Si vous exécutez votre programme dans un environnement qui supporte
TypeScript nativement (comme Deno ou Bun), alors il n'est pas nécessaire
de transcompiler le code TypeScript en JavaScript. Vous pouvez exécuter
les fichiers TypeScript directement (par exemple, avec la commande `deno
run --check main.ts`). Toutefois, si vous exécutez votre code dans un
navigateur web, alors il faut absolument utiliser le transcompilateur
TypeScript pour traduire le code en JavaScript.

La façon la plus simple d'installer le transcompilateur TypeScript est
d'utiliser le gestionnaire de paquet préconisé par votre plateforme. On
suggère Scoop sur Windows et Homebrew sur Mac. Sur Linux, cela dépend de
votre distribution.

Windows :

```sh
scoop install nodejs
npm install -g typescript
```

Mac : 

```sh
brew install typescript
```

## Utilisation

Vous trouverez ci-joint un fichier de configuration nommé
`tsconfig.json` qui contient les options de transcompilation à utiliser
pour ce cours. Veuillez placer celui-ci à la racine du répertoire de
tous vos programmes.

Pour traduire un programme TypeScript en JavaScript, il suffit
d'exécuter ensuite la commande `tsc`. Si votre code source ne contient
pas d'erreur, le transcompilateur traduira chaque fichier TypeScript
dont l'extension est `.ts` en un fichier JavaScript dont l'extension est
`.js`.

Pour éviter d'avoir à exécuter la commande `tsc` à chaque changement,
vous pouvez ajouter l'option `-w` afin d'activer le mode guetteur. Votre
programme sera ainsi automatiquement transcompilé.

```sh
tsc -w
```
