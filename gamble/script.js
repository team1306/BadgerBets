document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById("container");
    const matches = getMatches();

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];

        const matchContainer = document.createElement('h2');
        let text = match.match + " - ";
        if (match.bet.amount === 0) text += "No bet placed";
        else text += match.bet.amount + " on " + match.bet.alliance;
        matchContainer.innerHTML = text;
        matchContainer.addEventListener('click', () => openBetDetails(match, matchContainer));

        container.appendChild(matchContainer);
    }

});

function openBetDetails(match, matchInfo) {
    document.querySelectorAll('.details-box').forEach(e => e.remove());

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-box');

    const teams = document.createElement('div');
    for (let i = 0; i < getTeams(match.match).length; i++) {
        const team = getTeams(match.match)[i];
        const teamName = getTeamName(team);

        const teamElement = document.createElement('p');

        teamElement.innerHTML = team + " - " + teamName + "<br>";

        if (i < 3) teamElement.style = "color: blue";
        else teamElement.style = "color: red";

        teams.appendChild(teamElement);
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

    if (match.bet.alliance === "Red") redOption.selected = true;
    else blueOption.selected = true;

    const amountInput = document.createElement('input');
    amountInput.type = "number";
    amountInput.id = "amount-input";
    amountInput.classList.add('select');
    amountInput.placeholder = match.bet.amount;

    const submitButton = document.createElement('button');
    submitButton.innerHTML = "Submit";
    submitButton.classList.add('btn');
    submitButton.addEventListener('click', () => submitBet(match.match, matchInfo));

    detailsContainer.appendChild(teams);
    detailsContainer.appendChild(teamSelect);
    detailsContainer.appendChild(amountInput);
    insertAfter(detailsContainer, matchInfo);
}

function getMatches() {
    return [
        new Match("Q1", new Bet("Red", 100)),
        new Match("Q2", new Bet("Blue", 200)),
        new Match("Q3", new Bet("Red", 300))
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

class Match {
    constructor(match, bet) {
        this.match = match;
        this.bet = bet;
    }
}
class Bet {
    constructor(alliance, amount) {
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