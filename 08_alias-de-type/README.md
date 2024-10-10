# Alias de type

Un *alias* est un nom alternatif donné à un type. Un alias ne crée pas
un nouveau type de valeur comme le fait une classe ; il permet seulement
de référer à un type sous un autre nom. En ce sens, c'est surtout un
outil de documentation.

Considérons une fonction qui permet de déposer un montant d'argent dans
un compte en banque. Un montant est une information qui peut être
représentée de différentes façons : en dollar canadien, en euros, en
yen, en cents, etc. Techniquement, toutes ces valeurs seront de type
`number`. Un alias permettrait de documenter avec laquelle de ces
représentations notre fonction travaille.

Pour définir un nouvel alias, on utilise le mot-clé `type` suivi du nom
de l'alias puis du type.

```ts
type cents = number;
```

Une fois défini, l'alias peut être utilisé à la place des types natifs.

```ts
function deposit(amount: cents): void { ... }
```

Bien sûr, TypeScript ne sait pas faire la différence entre des cents et
des dollars. Rien ne vous empêchera donc d'appliquer la fonction sur un
nombre qui représente des dollars. Mais l'annotation permet ici
d'informer ceux et celles qui utiliseront la fonction.

## Types d'objet

Les alias peuvent être autant utilisés avec les primitifs (chaînes,
booléens, etc.) que les objets. Ceci permet d'alléger quelque peu la
signature des fonctions lorsque celles-ci manipulent des objets
complexes.

Un alias pour un objet est défini de la même manière que pour un
primitif. La structure de l'objet sera décrite en utilisant la syntaxe
pour les objets littéraux, à la différence que les propriétés peuvent
être séparées soit par des virgules soit par des points-vigules.

```ts
type account = { 
    name: string, 
    balance: number,
    deposit: (amount: cents) => cents,
    withdraw: (amount: cents) => cents,
};
```

### Interface

TypeScript est un système de typage structurel ; c'est-à-dire que le
vérificateur de type s'attarde à la *structure* des objets, et non à au
*nom* que porte l'alias. Un alias décrit donc l'*interface* d'une
catégorie d'objet. On considérera que n'importe quel objet ayant les
propriétés requises *satisfait* l'interface, et donc qu'il fait partie
de la catégorie, même si l'objet en question a des propriétés
supplémentaires.

Considérons par exemple un alias nommé `product` qui représente les
produits d'un commerce. Le commerce a plusieurs catégories de produits
(livres, papeterie, magazines, cartes cadeaux, etc), chacune ayant des
propriétés particulières. Tous les produits ont toutefois un prix. Le
fait qu'un objet aille un prix ou non détermine si celui-ci peut être
considéré par notre programme comme un `product`.

Voici comment on pourrait décrire ce domaine d'application à l'aide
d'alias de type :

```ts
type product = { price: number };
type book = { title: string, price: number, pages: number };
type stationery = { name: string, price: number };
```

Puisque les objets de type `book` et `stationery` ont une propriété
`price` dont le type est `number`, ils peuvent aussi être considérés
comme faisant partie de la catégorie `product`.

Considérons maintenant une fonction `buy` qui permet d'acheter un des
produits du commerce. Bien sûr, il ne sera pas possible de spécifier le
type du produit dans la signature de la fonction. Sinon, on pourra
seulement appliquer `buy` sur cette catégorie de produit. Pour que la
fonction `buy` puisse être appliquée sur tous les produits, il faudra
plutôt utiliser l'alias `product` comme le type du paramètre.

```ts
function buy(p: product): void { ... }
```

Même après que la fonction aille été conçue, il sera facile d'ajouter de
nouvelles catégories de produit. Il faudra simplement que celles-ci
aillent une propriété `price` dont la valeur est de type `number`. 

Cette caractéristique de TypeScript permet de penser un programme en
terme de *composition*.
