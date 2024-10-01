// Ce programme demande à l'utilisateur ou l'utilisatrice d'entrer son
// nom, puis écrit un message de salutation dans le terminal ou la
// console.

// Avec TypeScript, le type d'un paramètre est indiqué après le nom de
// celui-ci. Cette fonction prend donc un argument (name) de type
// « string » (chaîne de caractères), et retourne également une chaîne
// de caractères.
function greet(name: string): string {
    // Pour affecter une valeur constante à un identifiant, on utilise
    // le mot clé « const » ainsi que l'opérateur d'affectation « = ».
    // Les identifiants sont écrits en casse chameau.
    const greetingWord = "Hi";

    // Les chaînes de caractères peuvent être concaténées avec
    // l'opérateur « + ».
    const greeting = greetingWord + " " + name + "!";

    // On utilise le mot clé « return » suivi d'une expression pour
    // indiquer la valeur de retour d'une fonction, et pour stopper
    // l'exécution de celle-ci
    return greeting;
}

function main(): void {
    // La fonction native « prompt » affiche le message donné comme
    // argument, invite l'utilisateur ou l'utilisatrice à saisir du
    // texte, et retourne l'entrée.
    const name = prompt("Enter your name:");
    const message = greet(name);
    console.log(message);
}

main();
