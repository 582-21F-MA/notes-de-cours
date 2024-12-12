# Expressions rationnelles

Une expression rationnelle (parfois appelées « RegEx », de l'anglais
*regular expression*) est un motif formé de texte et de caractères
spéciaux qui permet d'effectuer une recherche dans une chaîne de
caractères. Puisqu'un site web ou un programme n'est rien d'autre qu'une
longue chaîne de caractères, maîtriser les expressions rationnelles peut
considérablement augmenter votre efficacité en tant que développeur ou
développeuse.

Considérons que vous cherchiez dans un chaîne quelconque tous les mots
qui commencent par le caractère « C » et qui se terminent par le
caractère « l » : Call, Cornwall, Criminal, etc. Il est difficile, voir
impossible, d'exprimer ce motif avec les outils de recherche usuels. Or
l'expression rationnelle qui correspond à ces critères est relativement
courte : `\bC\w*l\b`.

Quoique la syntaxe des expressions régulières peut sembler
contre-intuitive au début, elle permet de décrire des critères de
recherche qui sont difficiles à exprimer autrement. Le motif ci-dessus,
par exemple détecte n'importe quelle sous-chaîne qui commence par une
limite de mot (*word boundary* en anglais, d'où le `\b`), suivie du
caractère `C`, suivi de zéro ou plus caractères de mot (`\w*`), suivi du
caractère `l`, suivi d'une limite de mot (`\b`).

## Interfaces

### JavaScript

La plupart des langages de programmation offre une interface qui permet
d'exécuter des expressions rationnelles. En JavaScript, cette interface
est accessible à partir des objets de type `RegExp`, lesquels
représentent des expressions rationnelles (un peu comme les objets
`Date` représentent des dates).

Pour déclarer un nouveau motif, on utilise les littéraux d'expression
rationnelle, lesquels utilisent les barres obliques `/` pour délimiter
l'expression :

```js
const pattern = /\bC\w*l\b/g;
console.log(typeof pettern); // => object
```

Comme vous pouvez voir, la valeur d'un littéral d'expression rationnelle
est un objet. La variable `pattern` pointe donc vers un objet `RegExp`
qui représente le motif décrit précédemment.

Vous remarquerez aussi que la dernière barre oblique est suivie d'un
`g`. Celui-ci s'appelle un « marqueur », et il permet de configurer
l'expression régulière. Le marqueur `g` (global), par exemple, indique à
JavaScript de ne pas s'arrêter à la première correspondance lorsqu'on
effectue une recherche.

```
/bC\w*l\b/g
 -------- -
     |    |
   motif  marqueur
```

À partir de cette objet `RegExp`, on peut ensuite utiliser différentes
méthodes pour déterminer si une chaîne de caractères correspond au
motif, ou pour faire une recherche et extraire toutes les
correspondances.

```js
const isAMatch = pattern.test("foo");
console.log(isAMatch); // => false;

const matches = "John Call Apple Criminal Super".matchAll(pattern);
console.log(Array.from(matches)); // [ [ "Call", index: 5, ... ], [ "Criminal", index: 16, ... ] ]
```

### Ligne de commande

La ligne de commande est une autre interface qui permet d'exécuter des
expressions rationnelles. La commande `grep` par exemple, inclue dans la
majorité des distributions UNIX, filtre les lignes de son flux d'entrée,
et affiche seulement celles qui correspondent à un motif donné.

```
$ grep -E "UNIX" "README.md"
```

La commande ci-dessus, par exemple, lit le présent document, et affiche
seulement les lignes qui contiennent le motif `UNIX`.

Par soucis de breveté, les exemples ci-dessous utilisent la commande
`grep`, mais sachez que, à quelques exceptions près, vous pouvez
utiliser les mêmes motifs peu importe l'interface avec laquelle ceux-ci
sont exécutés.

## Écrire des motifs

Une expression rationnelle est composée de deux types de caractères :

-   les caractères spéciaux (ou « méta-caractères »), qui ont une
    signification particulière dans une expression rationnelle ; et
-   les caractères littéraux, qui représentent des caractères normaux.

La majorité des caractères appartiennent à la deuxième catégorie.
C'est-à-dire que la plupart des caractères dans une expression
rationnelle correspondent à eux-mêmes.

Par exemple, le motif `to` correspond simplement aux caractères « to ».
Ainsi, la commande suivante retourne toutes les correspondances de cette
sous-chaîne dans la chaîne donnée : 

```sh
$ echo "tomato" | grep -Eo "to"
to
to
```

Le drapeau `-E` indique à `grep` d'utiliser la syntaxe « *extended* »
des expressions régulières, et le drapeau `-o` indique d'afficher toutes
les correspondances plutôt que les lignes.

### Assertions de position

En plus des caractères littéraux, la syntaxe des expressions régulières
comprend plusieurs caractères spéciaux qui permettent d'exprimer des
contraintes plus complexes.

Les méta-caractères `^` et `$`, par exemple, représentent respectivement
le début et la fin d'une ligne de texte. Ainsi, le motif `cat`
correspond à toute les instances des lettres « cat » sur une ligne, mais
le motif `^cat` correspond seulement à une instance de « cat » en début
de ligne.

```sh
$ echo "education" | grep -Eo "^cat"
# aucune correspondance

$ echo "catapult" | grep -Eo "^cat"
cat
```

Autrement dit, les méta-caractères `^` et `$` correspondent à des
*positions* sur la ligne plutôt qu'à un caractère particulier.

### Classes de caractères

Les classes de caractères permettent de lister les caractères admis à
une certain position. Considérons par exemple un motif qui correspond
aux mots « gray » et « grey » :

```sh
$ echo "gray gris grey" | grep -Eo "gr[ea]y"
gray
grey
```

Alors que les caractères littéraux `g`, `r` et `y` correspondent aux
lettres « g », « r » et « y », la classe de caractères `[ea]` correspond
soit à la lettre « e » soit à la lettre « a ».

Au sein des crochets, le caractère `-` indique un étendu de caractères.
Ainsi, le motif `H[1-6]` est équivalent à `H[123456]`.

```sh
$ echo "H1 H2 B3" | grep -Eo "H[1-6]"
H1
H2
```

Toujours au sein des crochets, le caractère `^` correspond à l'opérateur
logique NOT. Le motif `H[^2]`, par exemple, correspond aux sous-chaînes
dont le premier caractère est « H », et le second n'est pas « 2 ».

```sh
$ echo "H1 H2 B3" | grep -Eo "H[^2]"
H1
```

Enfin, le méta-caractère `.` est un raccourci pour une classe de
caractères qui inclue tous les caractères. Imaginons par exemple que
l'on cherche toutes les instances d'une date précise, que celle-ci soit
sous la forme « 03/19/76 », « 03-19-76 », « 03.19.76 », ou même « 03 19
76 ». Le motif `03.19.76` ferait l'affaire.

### Échapper un caractère

L'exemple précédent mène inévitablement à la question suivante : si un
point correspond à tous les caractères, quel caractère correspond
seulement au point ? En effet, le motif `ega.att.com` correspond non
seulement à « ega.att.com », mais aussi, entre autres, à « megawatt 
com ». Pour faire référence seulement au caractère « . », on doit
*échapper* celui-ci avec la barre oblique `\`.

```sh
$ echo "megawatt com" | grep -Eo "ega\.att\.com"
# aucune correspondance
```

On peut échapper n'importe quel méta-caractère, incluant les crochets
(`\[\]`) et les assertions de position (`\^\$`).


### Alternatives

Le méta-caractère `|` est équivalent à l'opérateur logique OU. Il permet
de combiner plusieurs expression en une seule expression qui correspond
à une ou l'autre de ses parties.

Ainsi, le motif `gr[ae]y` peut aussi être exprimé comme tel :
`grey|gray`. On peut également utiliser les parenthèses pour contraindre
les alternatives à une partie du motif : `gr(a|e)y` (les parenthèses
sont aussi des méta-caractères). Notez toutefois que le motif `gr[a|e]y`
n'est pas équivalent. Au sein d'une classe, le caractère `|` est
littéral.

### Quantificateurs

Les méta-caractères `?`, `+` et `*` sont des quantificateurs qui
permettent de préciser le nombre d'occurrences du caractère précédent.
Le quantificateur `?` signifie 0 ou 1. Le quantificateur `+` signifie 1
ou plus. Le quantificateur `*` signifie 0 ou plus.

```sh
$ echo "colour color" | grep -Eo "colou?r"
colour
color
```

Attention, les quantificateurs s'appliquent seulement au caractère qui
précédent immédiatement le méta-caractère. Pour indiquer le nombre
d'occurrences d'un groupe de caractère, on utilise les parenthèses.

```sh
$ echo "bo bobo bobobo" | grep -Eo "(bo)+"
bo
bobo
bobobo
```
