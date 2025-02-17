import {Client, Databases} from 'https://esm.sh/appwrite@14.0.1';

import {getBucks, setBucks} from '/AppwriteStuff.js';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');
const databases = new Databases(client);
const sessionId = localStorage.getItem("session");
if(!sessionId) window.location.href = '../login/login.html';

// This function runs when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log("Document is fully loaded and DOM is ready!");

    var testTeams = [new FRCTeam(1306,"BadgerBOTS"), new FRCTeam(1111, "Blue2"), 
        new FRCTeam(2222, "Blue3"), new FRCTeam(3333, "Red1"), 
        new FRCTeam(4444, "Red2"), new FRCTeam(5555, "Red3")];

    setTeams(testTeams);
});

document.getElementById('bettingform').addEventListener('submit', async function(event) {
    event.preventDefault(); //prevents page from reloading

    //validation
    let isValid = true;

    const bet = document.getElementById('allianceselector').value;
    if (!bet) {isValid = false;console.log("bet is wrong");}
    const matchType = document.getElementById('matchtype').value;
    if (!matchType) {isValid = false;console.log("type is wrong");}

    const matchNumber = document.getElementById('matchnumber').value;
    if (!matchNumber) {isValid = false;console.log("matchnum is wrong");}

    const amount = parseInt(document.getElementById('amount').value);
    if (isNaN(amount) || await getBucks() < amount) {isValid = false; console.log("amount is wrong");}

    // If the form is valid, submit it
    if (isValid) {
        alert("Form submitted successfully!");
    } else {
        alert("Please fix the errors in the form.");
        return;
    }

    //win checking
    if (bet == getWinner(matchType, matchNumber)) {
        console.log("You win");
        //add bet to money
        setBucks(await getBucks() + amount);

    } else {
        console.log("You lost");
        //subtract bet from money
        setBucks(await getBucks() - amount);
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