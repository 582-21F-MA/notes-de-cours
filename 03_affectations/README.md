# Affectations

Un des outils les plus importants qu'offrent les langages de
programmation pour organiser nos idées est l'**abstraction**. Abstraire
une valeur désigne l'acte de lui donner un nom, et ainsi une
signification. Le nombre `18`, par exemple, peut représenter plusieurs
informations différentes : une date, une quantité, une dimension, l'âge
de la majorité dans certains pays, etc. La seule façon d'indiquer à quoi
cette valeur correspond dans notre programme est de la nommer.

En programmation, cette association entre un nom (ou **identifiant**) et
une valeur s'appelle une **affectation**. Les affectations permettent de
nommer les valeurs, et aussi de les « capturer » afin de pouvoir s'y
référer plus tard.

> [!NOTE]
> On utilise parfois la métaphore de la boîte pour expliquer
> l'affectation. Affecter une valeur à un identifiant serait comme
> mettre la valeur dans une boîte sur laquelle est écrit l'identifiant
> en question. Cette image est toutefois trompeuse. Vous verrez
> éventuellement qu'une même valeur peut avoir plusieurs identifiants.
> Une meilleure métaphore est celle de l'étiquette : affecter un
> identifiant à une valeur est comme coller une étiquette sur celle-ci.

En JavaScript, on utilise le mot-clé `const` pour introduire une
nouvelle affectation. La commande ci-dessous, par exemple, crée une
affectation dont l'identifiant est `sum` et dont la valeur correspond au
résultat de l'expression `5 + 5` (10):

```js
const sum = 5 + 5;
```

Une fois affecté à une valeur, un identifiant peut être utilisé comme
n'importe quelle autre expression. Lorsque l'interprétateur lit un
identifiant, il le remplace par la valeur à laquelle le identifiant est
affecté à ce moment.

```js
console.log(sum * sum); // => 100 (10 * 10);
```

On distingue deux genres d'affection : les **constantes** et les
**variables**. Le mot-clé `const` permet de définir une constante,
c'est-à-dire une affectation _permanente_ entre un identifiant et une
valeur. JavaScript inclut également le mot-clé `let`, qui permet de
définir une variable. Contrairement aux constantes, les variables
peuvent être « détachées » de leur valeur actuelle, et réaffecter à une
nouvelle valeur.

```js
// Affectation
let mood = "light";
console.log(mood); // => "light";

// Réaffectation
mood = "dark";
console.log(mood); // => "dark";
```

> [!NOTE]
> Quand utiliser `let` versus `const` ? En JavaScript, on utilise `let`
> _seulement_ si l'identifiant est réaffecter à une nouvelle valeur. Par
> conséquent, on suggère d'utiliser `const` par défaut, et de convertir
> une constante en variable au besoin. La grande majorité de vos
> affectations devraient être des constantes. Dans tous les cas, évitez
> `var`, qui n'est plus utilisé aujourd'hui car il causait beaucoup de
> bogues.

On rappelle que l'expression à droite du `=` est toujours évaluée
_avant_ d'être affectée à l'identifiant qui se trouve à gauche. Ainsi,
dans l'exemple ci-dessous, on réaffecte la variable `luigisDebt` au
résultat de l'expression `luigisDebt - 35`. Au moment d'évaluer cette
expression, la valeur de `luigisDebt` est `140`.

```js
let luigisDebt = 140;
luigisDebt = luigisDebt - 35;
//           ----------
//               |
//              140

console.log(luigisDebt); // => 105;
```

En JavaScript, il est conventionnel d'utiliser la casse chameau (_camel
case_, en anglais) pour nommer les valeurs. Les mots sont séparer en
faisant varier la casse typographique plutôt qu'en insérant des espaces
ou une ponctuation — `luigisDebt` et non `lugis-debt` ou `luigis_debt`.

Le nom d'une valeur devrait indiquer ce qu'elle représente, et non le
type de donné qu'elle contient. On évite donc de nommer une valeur `x`
(qui ne veut rien dire) ou `num` (qui ne dit rien sur la signification
du nombre). Pareillement, on fera attention aux abréviations, qui
peuvent porter à confusion. En général, plus une affectation est
utilisée _loin_ d'où elle est déclarée, plus son nom doit être
explicite. Gardez à l'esprit les futur·es lecteurs et lectrices de votre
programme !
