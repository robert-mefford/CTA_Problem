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

    let possibleFares = [0];    //possible fare amout with combination of gavvoes
    let lastGavvoForFare = {};  //last used gavvo piece

    for (let gavvo of gavvoPieces) {
        if (fareAmount in lastGavvoForFare) break;
        let sumLength = possibleFares.length;
        for (let j = 0; j < sumLength; j++) {
            let s = possibleFares[j];
            if (s + gavvo > fareAmount) break;
            if((s + gavvo) in lastGavvoForFare) continue;

            lastGavvoForFare[s + gavvo] = gavvo;    //keep the last used gavvo piece with fare amout
            possibleFares.push(s + gavvo);  //add new fare amout to possible fare amout array
        }
        possibleFares = [...new Set(possibleFares)];    //remove duplicates
    }
    if (!(fareAmount in lastGavvoForFare)) return "not possible";   //not possible if there's no last used gavvo
    return getUsedGavvoes(fareAmount, lastGavvoForFare);
}

//find used gavvoes for fare amount
const getUsedGavvoes = (fareAmount, lastGavvoForFare) => {
    let usedGavvoes = [];
    while (fareAmount) {
        usedGavvoes.push(lastGavvoForFare[fareAmount]); //get last used gavvo piece
        fareAmount -= lastGavvoForFare[fareAmount]; //decrease the fare amout
    }
    return usedGavvoes;
}