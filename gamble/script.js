import { getDocument, getLoggedInUser, updateAppwriteDocument, getAllDocumentsInCollection } from '../AppwriteStuff.js';

let bets = {};
/*
{
  matchID: [bet, htmlelement],
  matchID: [bet, htmlelement],
  ...
}
*/

let user = {};

document.addEventListener('DOMContentLoaded', async () => {
    // redirects to login if not logged in and online
    user = await getLoggedInUser();

    const container = document.getElementById("container");

    bets = await fillBets();
    console.log(bets);
    console.log(Object.keys(bets));

    for (let i = 0; i < Object.keys(bets).length; i++) {
        const bet = bets[Object.keys(bets)[i]];
        console.log(bet);
        const matchContainer = document.createElement('h2');
        bets[bet.matchID] = [bet, matchContainer];
        
        matchContainer.innerHTML = betText(bet);
        matchContainer.addEventListener('click', () => openBetDetails(bet, matchContainer));

        container.appendChild(matchContainer);
    }
});

function betText(bet) {
    let text = bet.matchID + " - ";
    if (bet.amount === 0) text += "No bet placed";
    else text += bet.amount + " on " + bet.alliance;
    return text;
}

function openBetDetails(bet, matchInfo) {
    document.querySelectorAll('.details-box').forEach(e => e.remove());

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-box');

    const teamsContainer = document.createElement('div');
    teamsContainer.classList.add('teams-container');
    
    const blueContainer = document.createElement('div');
    blueContainer.classList.add('blue-teams');
    teamsContainer.appendChild(blueContainer);
    const redContainer = document.createElement('div');
    redContainer.classList.add('blue-teams');
    teamsContainer.appendChild(redContainer);
    for (let i = 0; i < getTeams(bet.matchID).length; i++) {
        const team = getTeams(bet.matchID)[i];
        const teamName = getTeamName(team);

        const teamElement = document.createElement('p');

        teamElement.innerHTML = team + " - " + teamName + "<br>";

        if (i < 3) {
            teamElement.classList.add('blue-team');
            blueContainer.appendChild(teamElement);
        }
        else {
            teamElement.classList.add('red-team');
            redContainer.appendChild(teamElement);
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
    submitButton.addEventListener('click', () => {
        updateBet(new Bet(bet.matchID, teamSelect.value, parseInt(amountInput.value)));
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
    detailsContainer.appendChild(buttonContainer);
    insertAfter(detailsContainer, matchInfo);
}

async function updateBet(bet) {
    if (isNaN(bet.amount)) bet.amount = 0;
    console.log("ALLIANCE: " + bet.alliance);
    console.log("AMOUNT: " + bet.amount);

    console.log(bets[bet.matchID]);
    bets[bet.matchID][0].alliance = bet.alliance;
    bets[bet.matchID][0].amount = bet.amount;
    bets[bet.matchID][1].innerHTML = betText(bet);

    try {
        await updateAppwriteDocument("678dd2fb001b17f8e112", "bets", bet.matchID + "-" + user.$id, { "user": user.$id, "amount": bet.amount, "matchId": bet.matchID, "redorblue": bet.alliance });
        console.log("Document update success");
    } catch (error) {
        console.error("Error in updating document:", error);
    }
}

async function fillBets() {
    let bets = {};

    const allBets = await getAllDocumentsInCollection("678dd2fb001b17f8e112", "bets");
    const allUserBets = allBets.filter(bet => bet.user === user.$id);

    let unbetMatches = [];
    for (const match of getMatches()) {
        const bet = allUserBets.find(bet => bet.matchId === match);
        console.log(bet);
        if (bet === undefined) {
            console.log("No bet found for " + match);
            unbetMatches.push(match);
            continue;
        }
        bets[match] = new Bet(match, bet.redorblue, bet.amount);
    }

    for(const match of unbetMatches) {
        bets[match] = new Bet(match, "Blue", 0);
    }

    return Object.fromEntries(
        Object.entries(bets).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    );
}

function getMatches() {
    return [
        "Q1",
        "Q2",
        "Q3",
        "Q4",
        "Q5",
        "Q6",
        "Q7",
        "Q8",
        "Q9",
        "Q10",
        "Q11",
        "Q12",
        "Q13",
        "Q14",
        "Q15"
    ];
}

function getTeams(matchID) {
    console.log("GetTeams not implemented");
    return [
        1111,
        2222,
        3333,
        4444,
        5555,
        6666
    ]
}

function getTeamName(teamNumber) {
    console.log("GetTeamName not implemented");
    return "Test Team";
}

class Bet {
    constructor(matchID, alliance, amount) {
        this.matchID = matchID;
        this.alliance = alliance;
        this.amount = amount;
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