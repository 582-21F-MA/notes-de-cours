// Ce programme demande à l'utilisateur ou l'utilisatrice d'entrer un
// mot, puis écrit le nombre de « b » que contient le mot dans le
// terminal ou la console.

// En JavaScript, le type principal de valeur numérique est « number ».
// Il inclut les nombres entiers ainsi que les nombres à virgule
// flottante.
function countBs(word: string): number {
    // Le mot clé « let » permet de créer une variable dont la valeur
    // peut être réaffectée. La valeur de « count » est incrémentée à
    // l'intérieur de la boucle « for » ci-dessous.
    let count = 0;

    // Puisqu'un argument est une variable, on peut réaffecter sa
    // valeur. Ici, la fonction native « toLoweCase » retourne la valeur
    // de « word » en lettres minuscules.
    word = word.toLowerCase();

    // La boucle « for » ci-dessous incrémente la valeur de la variable
    // « i » tant et aussi longtemps que sa valeur est plus petite que
    // le nombre de caractères dans « word ».
    for (let i = 0; i < word.length; i++) {
        if (word[i] !== "b") continue;
        count += 1;
    }

    return count;
}

function main(): void {
    const word = prompt("Enter a word:");
    const count = countBs(word);

    // On utilise les littéraux de gabarits pour intégrer des
    // expressions dans une chaîne de caractères. Les gabarits sont
    // délimités par des accents graves. Les expressions sont indiquées
    // par un signe dollar et des accolades.
    const message = `Number of Bs: ${count}`;

    console.log(message);
}

main();
