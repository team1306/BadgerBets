import { executeFunction, getLoggedInUser, updateAppwriteDocument, getAllDocumentsInCollection, hasConnectionAppwrite, setAttribute, getAttribute } from '../AppwriteStuff.js';
import { calculateOdds } from '../gamble/betHandler.js';

let bets = {};
/*
{
  matchID: [bet, htmlelement],
  matchID: [bet, htmlelement],
  ...
}
*/

let matchSchedule = {};

let user = {};

const BET_FLOOR = 50;

document.addEventListener('DOMContentLoaded', async () => {
    
    const container = document.getElementById("container");

    const connected = await hasConnectionAppwrite()
    if (!connected) {
        const noInternet = document.createElement('h2');
        noInternet.innerHTML = "No Internet";
        container.appendChild(noInternet);

        const retry = document.createElement('a');
        retry.href = window.location.href;
        retry.innerHTML = "Retry";
        container.appendChild(retry);
        return;
    }

    // redirects to login if not logged in and online
    user = await getLoggedInUser();

    const loading = document.createElement('h2');
    loading.innerHTML = "Loading Bets...";
    container.appendChild(loading);

    bets = await fillBets();

    //if (Object.keys(matchSchedule).length === 0) window.location.href = window.location.href;

    loading.remove();

    for (let i = 0; i < Object.keys(bets).length; i++) {
        const bet = bets[Object.keys(bets)[i]];
        const matchContainer = document.createElement('h2');
        bets[bet.matchID] = [bet, matchContainer];
        
        matchContainer.innerHTML = betText(bet);
        matchContainer.addEventListener('click', async () => openBetDetails(bet, matchContainer));

        container.appendChild(matchContainer);
    }
});

function betText(bet) {
    let text = bet.matchID + " - ";
    if (bet.amount === 0) text += "No bet placed";
    else text += bet.amount + " on " + bet.alliance;
    text += bet.closeTime > getCurrentTime() ? " - Open" : " - Closed";
    return text;
}

function openBetDetails(bet, container) {
    document.querySelectorAll('.details-box').forEach(e => e.remove());

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-box');

    const closeTime = document.createElement('p');
    //string formatting hell
    let niceTime = bet.closeTime.substring(5, 16).replace("-", "/").replace("T", " ");
    let hour = parseInt(niceTime.substring(6, 8));
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert to 12-hour format, handling midnight as 12
    niceTime = niceTime.substring(0, 6) + hour + niceTime.substring(8) + " " + period;
    closeTime.innerHTML = (bet.closeTime > getCurrentTime ? "Bet closes at " : "Bet closed at ") + niceTime;
    closeTime.style = "color: black";
    detailsContainer.appendChild(closeTime);

    const teamsContainer = document.createElement('div');
    teamsContainer.classList.add('teams-container');
    
    const blueContainer = document.createElement('div');
    blueContainer.classList.add('blue-teams');
    teamsContainer.appendChild(blueContainer);
    const redContainer = document.createElement('div');
    redContainer.classList.add('blue-teams');
    teamsContainer.appendChild(redContainer);

    const blueOdds = document.createElement('p');
    blueOdds.innerHTML = "Calculating odds...";
    calculateOdds(bet.matchID).then(result => {
        blueOdds.innerHTML = result === null ? "None on Blue" : ((result).toFixed(2)*100) + "% on Blue";
    });
    blueOdds.classList.add("blue-team");
    blueOdds.style.fontWeight = "bold";
    blueContainer.appendChild(blueOdds);

    const redOdds = document.createElement('p');
    redOdds.innerHTML = "Calculating odds...";
    calculateOdds(bet.matchID).then(result => {
        redOdds.innerHTML = result === null ? "None on Red" : ((1 - result).toFixed(2)*100) + "% on Red";
    });
    redOdds.classList.add("red-team");
    redOdds.style.fontWeight = "bold";
    redContainer.appendChild(redOdds);

    for (let i = 0; i < getTeams(bet.matchID).length; i++) {
        const team = getTeams(bet.matchID)[i];
        const teamName = getTeamName(team);

        const teamElement = document.createElement('p');

        teamElement.innerHTML = team + " - " + teamName + "<br>";

        if (i < 3) {
            teamElement.classList.add('red-team');
            redContainer.appendChild(teamElement);
        }
        else {
            teamElement.classList.add('blue-team');
            blueContainer.appendChild(teamElement);
        }
    }

    const teamSelect = document.createElement('select');
    teamSelect.id = "team-select";
    teamSelect.classList.add('select');

    const redOption = document.createElement('option');
    redOption.value = "Red";
    redOption.innerHTML = "Red";
    teamSelect.appendChild(redOption);
    const blueOption = document.createElement('option');
    blueOption.value = "Blue";
    blueOption.innerHTML = "Blue";
    teamSelect.appendChild(blueOption);

    if (bet.alliance === "Red") redOption.selected = true;
    else blueOption.selected = true;

    const bucksDisplay = document.createElement('h3');
    bucksDisplay.innerHTML = "Loading bucks...";
    getAttribute("678dd2fb001b17f8e112", "badgerBucks", user.$id, "BadgerBucks").then(result => {
        bucksDisplay.innerHTML = "Your bucks: " + result;
    });

    const amountInput = document.createElement('input');
    amountInput.type = "number";
    amountInput.id = "amount-input";
    amountInput.classList.add('select');
    amountInput.placeholder = 0;
    amountInput.value = bet.amount;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const submitButton = document.createElement('button');
    submitButton.id = 'submit';
    submitButton.className = 'btn';

    if (getCurrentTime > bet.closeTime || bet.amount != 0) {
        // submitButton.id = "submit-closed";
    }

    // Create the inner span for the icon and text
    const submitSpanWrapper = document.createElement('span');
    submitSpanWrapper.className = 'center';

    // Create the Material Icon
    const submitIcon = document.createElement('span');
    submitIcon.className = 'material-symbols-outlined';
    submitIcon.innerText = 'input'; // This is the name of the Material Icon

    // Create the text node for "Submit"
    const submitText = document.createTextNode('Submit');

    // Append icon and text to the span wrapper
    submitSpanWrapper.appendChild(submitIcon);
    submitSpanWrapper.appendChild(submitText);

    // Append the span wrapper to the button
    submitButton.appendChild(submitSpanWrapper);
    if (submitButton.id === "submit")
        submitButton.addEventListener('click', () => {
            updateBet(new Bet(bet.matchID, teamSelect.value, parseInt(amountInput.value), bet.closeTime));
            detailsContainer.remove();
        });

    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancel';
    cancelButton.className = 'btn';

    const cancelSpanWrapper = document.createElement('span');
    cancelSpanWrapper.className = 'center';

    const cancelIcon = document.createElement('span');
    cancelIcon.className = 'material-symbols-outlined';
    cancelIcon.innerText = 'cancel'; // This is the name of the Material Icon

    const cancelText = document.createTextNode('Cancel');

    cancelSpanWrapper.appendChild(cancelIcon);
    cancelSpanWrapper.appendChild(cancelText);

    cancelButton.appendChild(cancelSpanWrapper);
    cancelButton.addEventListener('click', () => detailsContainer.remove());

    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(cancelButton);

    detailsContainer.appendChild(teamsContainer);
    detailsContainer.appendChild(teamSelect);
    detailsContainer.appendChild(amountInput);
    detailsContainer.appendChild(bucksDisplay);
    detailsContainer.appendChild(buttonContainer);
    insertAfter(detailsContainer, container);
}

async function updateBet(bet) {
    if (isNaN(bet.amount) || bet.amount < 0) bet.amount = 0;
    if (bet.amount < BET_FLOOR) {
        bet.amount = 0;
        alert("Minimum bet is " + BET_FLOOR);
    }

    let previousAmount = bets[bet.matchID][0].amount;
    console.log(bets[bet.matchID][0]);
    console.log(previousAmount);
    if (isNaN(previousAmount)) previousAmount = 0;

    console.log("Previous Bet: " + previousAmount);
    console.log("New bet: " + bet.amount);

    const spend = bet.amount - previousAmount;

    console.log(spend + " bucks should be subtracted");


    const currentBucks = await getAttribute("678dd2fb001b17f8e112", "badgerBucks", user.$id, "BadgerBucks");
    if (currentBucks - spend < 0) {
        alert("You don't have enough bucks");
        return;
    }

    bets[bet.matchID][0].alliance = bet.alliance;
    bets[bet.matchID][0].amount = bet.amount;
    bets[bet.matchID][1].innerHTML = betText(bet);

    await updateAppwriteDocument("678dd2fb001b17f8e112", "bets", bet.matchID + "-" + user.$id, 
        { "user": user.$id, "amount": bet.amount, "matchId": bet.matchID, "redorblue": bet.alliance });

    await setAttribute("678dd2fb001b17f8e112", "badgerBucks", user.$id, "BadgerBucks", currentBucks - spend);
}

async function fillBets() {
    let bets = {};

    const allBets = await getAllDocumentsInCollection("678dd2fb001b17f8e112", "bets");
    const allUserBets = allBets.filter(bet => bet.user === user.$id);

    let unbetMatches = [];
    const matchIds = await getMatchIds();
    for (const match of matchIds) {
        const bet = allUserBets.find(bet => bet.matchId === match);
        if (bet === undefined) {
            unbetMatches.push(match);
            continue;
        }
        bets[match] = new Bet(match, bet.redorblue, bet.amount, matchSchedule[match].startTime);
    }

    for(const match of unbetMatches) {
        bets[match] = new Bet(match, "Blue", 0, matchSchedule[match].startTime);
    }

    return Object.fromEntries(
        Object.entries(bets).sort(([keyA], [keyB]) => 
            parseInt(keyA.substring(1)) - parseInt(keyB.substring(1))
        )
    );
}

async function getCurrentTime() {
    return Date.now();
}

async function getMatchIds() {
    const result = await executeFunction("getMatches", Appwrite.ExecutionMethod.GET);
    console.log(JSON.parse(result.responseBody));
    console.log(JSON.parse(result.responseBody)[0]);
    console.log(JSON.parse(result.responseBody)[0].Schedule);
    const matches = JSON.parse(result.responseBody)[0].Schedule;
    matches.concat(JSON.parse(result.responseBody)[1].Schedule);

    let matchIds = [];
    for (const match of matches) {
        const matchId = match.tournamentLevel[0] + match.matchNumber;
        matchIds.push(matchId);

        matchSchedule[matchId] = match;
    }

    console.log(matchSchedule);
    return matchIds;
}

function getTeams(matchID) {
    let teamNumbers = [];
    const teams = matchSchedule[matchID].teams;
    for (const team in teams) {
        teamNumbers.push(teams[team].teamNumber);
    }
    return teamNumbers;
}

function getTeamName(teamNumber) {
    switch(teamNumber) {
        case 1306: return "BadgerBOTS";
        default: return "Unknown Team";
    }
}

class Bet {
    constructor(matchID, alliance, amount, closeTime) {
        this.matchID = matchID;
        this.alliance = alliance;
        this.amount = amount;
        this.closeTime = closeTime;
    }
}

//ChatGPT code
function insertAfter(newElement, referenceElement) {
    const parent = referenceElement.parentNode;
  
    // If the reference element has a next sibling, insert the new element before it
    if (referenceElement.nextSibling) {
      parent.insertBefore(newElement, referenceElement.nextSibling);
    } else {
      // If there is no next sibling (i.e., the reference element is the last child), append it
      parent.appendChild(newElement);
    }
  }