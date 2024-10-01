// Ce programme demande à l'utilisateur ou l'utilisatrice d'entrer une
// phrase, puis écrit dans le terminal ou la console le nombre de mots
// qu'elle contient, ainsi que le nombre total de lettres.

// La fonction « getWords » retourne un tableau qui contient des chaînes
// de caractères. Avec TypeScript, il faut préciser le type des éléments
// d'un tableau.
function getWords(sentence: string): string[] {
    // La fonction native « split » divise la chaîne de caractère
    // « sentence » selon une sous-chaîne donnée, et retourne un
    // tableau contenant le résultat.
    return sentence.split(" ");
}

function countWords(sentence: string): number {
    const words = getWords(sentence);

    // La propriété « length » est accessible autant pour une chaîne de
    // caractères que pour un tableau. Ici, la valeur de « length » est
    // le nombre d'éléments qui se trouve dans le tableau « words ».
    const count = words.length;

    return count;
}

function countLetters(words: string[]): number {
    let count = 0;

    // La boucle « for...of » itère sur les éléments du tableau
    // « words » (pluriel). À chaque itération, un élément différent est
    // affecté à la variable « word » (singulier).
    for (let word of words) {
        count += word.length;
    }

    return count;
}

function main(): void {
    const sentence = prompt("Enter a sentence:");
    const wordCount = countWords(sentence);
    const letterCount = countLetters(getWords(sentence));
    console.log(`Word count: ${wordCount}`);
    console.log(`Letter count: ${letterCount}`);
}

main();
