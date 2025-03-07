import {getSaveName, getSavedMatchesByPrefix} from '../scout/script.js';

document.getElementById('archive-removal-form').addEventListener('submit', () => {
    event.preventDefault();

    const matchType = document.getElementById('match-type').value;
    const matchNumber = document.getElementById('match-number').value;
    const matchID = matchType + matchNumber;
    const teamNumber = document.getElementById('team-number').value;
    const userName = document.getElementById('name').value;
    console.log(teamNumber);
    console.log(userName);

    const archive = getSavedMatchesByPrefix('ARCHIVE_');
    if (archive.length == 0) {
        alert("There are no archived matches");
        return;
    }
    let match;
    archive.forEach(element => {
        const stringElement = JSON.stringify(element);
        console.log(stringElement);
        if (stringElement.includes(matchID) && stringElement.includes(teamNumber) && stringElement.includes(userName)) 
            match = element;
    });
    if (!match) {
        alert("Match not found");
        return;
    }

    try {
        localStorage.setItem(getSaveName(match.match, match.team_number, match.name, false), JSON.stringify(match));
        localStorage.removeItem(getSaveName(match.match, match.team_number, match.name, true));
        alert('Successfully retrieved from archive');
    } catch (error) {
        alert("Error removing from archive");
        console.log("ERROR: " + error);
        console.log("ERROR MESSAGE " + error.message);
    }
    
});