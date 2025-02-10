// script.js


// This function runs when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log("Document is fully loaded and DOM is ready!");

    var testTeams = [new FRCTeam(1306,"BadgerBOTS"), new FRCTeam(1111, "Blue2"), 
        new FRCTeam(2222, "Blue3"), new FRCTeam(3333, "Red1"), 
        new FRCTeam(4444, "Red2"), new FRCTeam(5555, "Red3")];

    setTeams(testTeams);
});

document.getElementById('bettingform').addEventListener('submit', function(event) {
    event.preventDefault(); //prevents page from reloading
    console.log("Form submitted");

    const bet = document.getElementById('allianceselector').value;
    const matchType = document.getElementById('matchtype').value;
    const matchNumber = document.getElementById('matchnumber').value;
    const amount = document.getElementById('amount').value;

    if (bet == getWinner(matchType, matchNumber)) {
        console.log("You win");
    } else {
        console.log("You lost");
    }

    //window.location.href = '../dashboard/dashboard.html';
});

/**
 * @param matchType 0 for qual, 1 for playoff
 * @returns 0 if blue won, 1 if red won
 */
function getWinner(matchType, matchNumber) {
    return 0;
}

/**
 * Sets the text for teams
 * @param {FRCTeam[]} frcTeams blue1,2,3, red1,2,3
 */
function setTeams(frcTeams) {
    for (var i = 0; i < frcTeams.length; i++) {
        document.getElementById('team' + i).innerHTML = 
            "Team " + frcTeams[i].teamNum + " - " + frcTeams[i].teamName;
    }
}

class FRCTeam {
    constructor(teamNum, teamName) {
        this.teamNum = teamNum;
        this.teamName = teamName;
    }

    teamNum;
    teamName;
}