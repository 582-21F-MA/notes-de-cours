// Ce programme demande à l'utilisateur ou l'utilisatrice d'entrer un
// mot, puis écrit dans le terminal ou la console la valeur Scrabble de
// celui-ci.

function letterValue(letter: string): number {
    // La variable « categories » contient un tableau d'objets, chacun
    // correspondant à une catégorie. Un objet est un ensemble de
    // propriétés. Chaque propriété a un nom (ci-dessous, « value » ou
    // « letters ») et une valeur.
    const categories = [
        {
            value: 1,
            letters: ["a", "e", "i", "l", "n", "o", "r", "s", "t", "u"],
        },
        { value: 2, letters: ["d", "g"] },
        { value: 3, letters: ["b", "c", "m", "p"] },
        { value: 4, letters: ["f", "h", "v", "w", "y"] },
        { value: 5, letters: ["k"] },
        { value: 8, letters: ["j", "x"] },
        { value: 10, letters: ["q", "z"] },
    ];
    for (let category of categories) {
        // On accède à la valeur d'une propriété avec une notation
        // utilisant le point. Ci-dessous, « letters » est une propriété
        // de « category ». La valeur de « letters » est un tableau. Par
        // défaut, tous les tableaux ont une propriété « includes ». La
        // valeur de « includes » est une fonction qui détermine si une
        // valeur donnée est incluse dans le tableau. Une propriété dont
        // la valeur est une fonction est appelée une méthode.
        if (!category.letters.includes(letter)) continue;
        return category.value;
    }
    return 0;
}

function wordValue(word: string): number {
    let value = 0;
    for (let letter of word) {
        value += letterValue(letter);
    }
    return value;
}

function main(): void {
    const word = prompt("Enter a word:");

    // Puisque la fonction native « prompt » retourne soit une chaîne
    // soit « null » (rien), on doit vérifier que la valeur de « word »
    // n'est pas nulle avant d'appliquer « wordValue » sur celui-ci.
    // Pour ce faire, on utilise l'opérateur conditionnel, lequel
    // détermine si l'expression avant « ? » est vraie. Si oui, la
    // valeur de l'opération sera l'expression après « ? ». Sinon, la
    // valeur de l'opération sera l'expression après « : ».
    const value = word ? wordValue(word) : 0;
    console.log(`Value: ${value}`);
}

main();
