import { getUser, hasConnectionAppwrite } from '../AppwriteStuff.js';

let bets = {};
/*
{
  matchID: [bet, htmlelement],
  matchID: [bet, htmlelement],
  ...
}
*/

let user;

document.addEventListener('DOMContentLoaded', async () => {
    await hasConnectionAppwrite().then(async connected => {
        if (!connected) {
            alert("No internet connection");
            return;
        }

        user = await getUser();

        const container = document.getElementById("container");
        const loadedBets = getBets();

        for (let i = 0; i < loadedBets.length; i++) {
            const bet = loadedBets[i];
            const matchContainer = document.createElement('h2');
            bets[bet.matchID] = [bet, matchContainer];
            
            matchContainer.innerHTML = betText(bet);
            matchContainer.addEventListener('click', () => openBetDetails(bet, matchContainer));

            container.appendChild(matchContainer);
        }
    }).catch(err => {
        console.error(err);
    });
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

function updateBet(bet) {
    if (isNaN(bet.amount)) bet.amount = 0;
    console.log("ALLIANCE: " + bet.alliance);
    console.log("AMOUNT: " + bet.amount);

    console.log(bets[bet.matchID]);
    bets[bet.matchID][0].alliance = bet.alliance;
    bets[bet.matchID][0].amount = bet.amount;
    bets[bet.matchID][1].innerHTML = betText(bet);
}

function getBets() {
    return [
        new Bet("Q1", "Blue", 0),
        new Bet("Q2", "Blue", 0),
        new Bet("Q3", "Blue", 0)
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