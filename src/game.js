// game.js

export function uniq(xs) {
    return Array.from(new Set(xs));
}

export function word_view(secret, guesses) {
    let view = [];
    for (let cc of secret.split('')) {
        if (guesses.includes(cc)) {
            view.push(cc);
        }
        else {
            view.push("_");
        }
    }
    return view;
}

export function bad_guesses(secret, guesses) {
    let letters = secret.split('');
    let bads = [];
    for (let gg of guesses) {
        if (!letters.includes(gg)) {
            bads.push(gg);
        }
    }
    return uniq(bads);
}

export function bulls_cows(secret, guesses) {
    let lettersAns = secret.split(''); //array of the letters in the answer
    let bcs = [];

    for (let gg of guesses) {
        let b = 0;
        let c = 0;
        let lettersGuess = gg.split('');
        //for each letter in each guess
        for (let i = 0; i < 4; i++) {
            if (lettersAns.includes(lettersGuess[i])) {
                if (lettersGuess[i] === lettersAns[i]) {
                    b++;
                } else {
                    c++;
                }
            }
        }

        let bcString = "B" + b + " C" + c;
        bcs.push(bcString);
    }

    return uniq(bcs);
}


export function lives_left(secret, guesses) {
    return 8 - bad_guesses(secret, guesses).length;
}