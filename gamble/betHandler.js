import { getAllDocumentsInCollection } from "../AppwriteStuff.js";

/**
 * Calculates the odds for a given match
 * @param {String} matchId
 * @returns {number} percent of money bet on blue as a decimal. Between 0 and 1.
 */
export async function calculateOdds(matchId) {
    const allBets = await getAllDocumentsInCollection("678dd2fb001b17f8e112", "bets");
    const matchBets = allBets.filter(match => match.matchId === matchId);
    console.log(matchBets);

    let pool = 0;
    for (const bet in matchBets) {
        pool += matchBets[bet].amount;
    }

    const blueBets = matchBets.filter(match => match.redorblue === "Blue");
    let bluePool = 0;
    for (const bet in blueBets) {
        bluePool += blueBets[bet].amount;
    }

    const bluePercent = bluePool/pool;
    
    return bluePercent;
}