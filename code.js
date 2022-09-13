const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Input Data: ', data => {
    const numArray = data.split(" ").map(ch => Number(ch));
    console.log(getPossibleCoins(numArray[0], numArray.slice(1)));
    readline.close();
});

const getPossibleCoins = (fareAmount, gavvoPieces) => {
    let totSum = gavvoPieces.reduce((prev, coin) => prev + coin, 0);

    if (totSum < fareAmount) return "not possible";

    let possibleFares = [0];
    let lastGavvoForFare = {};

    for (let gavvo of gavvoPieces) {
        if (fareAmount in lastGavvoForFare) break;
        let sumLength = possibleFares.length;
        for (let j = 0; j < sumLength; j++) {
            let s = possibleFares[j];
            if (s + gavvo > fareAmount) break;
            if((s + gavvo) in lastGavvoForFare) continue;

            lastGavvoForFare[s + gavvo] = gavvo;
            possibleFares.push(s + gavvo);
        }
        possibleFares = [...new Set(possibleFares)];
    }
    if (!(fareAmount in lastGavvoForFare)) return "not possible";
    return getUsedGavvoes(fareAmount, lastGavvoForFare);
}

const getUsedGavvoes = (fareAmount, lastGavvoForFare) => {
    let usedGavvoes = [];
    while (fareAmount) {
        usedGavvoes.push(lastGavvoForFare[fareAmount]);
        fareAmount -= lastGavvoForFare[fareAmount];
    }
    return usedGavvoes;
}