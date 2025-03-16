import {getSaveName, getSavedMatchesByPrefix} from '../match-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const matchContainer = document.getElementById("match-container");
    createMatchSelectors('MATCH_', 'match-container');
    createMatchSelectors('ARCHIVE_', 'archive-container');
});

/**
 * @param {Dictionary} match match dictionary
 */
function showMatchDetails(match) {
    console.log(JSON.stringify(match));
    
    const statsContainer = document.getElementById('stats-container');
    let child = statsContainer.lastElementChild;
        while (child) {
            statsContainer.removeChild(child);
            child = statsContainer.lastElementChild;
        }
    
    Object.entries(match).forEach(([key, value]) => {

        const valueContainer = document.createElement('input');
        valueContainer.placeholder = value;
        valueContainer.classList.add('select');
        valueContainer.id = key;
        valueContainer.addEventListener('change', () => modifyMatchInfo(match, key, valueContainer.value));

        const infoContainer = document.createElement('label');
        infoContainer.htmlFor = key;
        infoContainer.innerHTML = key;

        statsContainer.appendChild(infoContainer);
        statsContainer.appendChild(valueContainer);

        const br = document.createElement('br');
        statsContainer.appendChild(br);
    });
}

function modifyMatchInfo(match, key, value) {
    if (key === "team_number" || key === "auto_L1" || key === "auto_L2" || key === "auto_L3" || key === "auto_L4" || key === "auto_net" || key === "auto_processor" || key === "teleop_L1" || key === "teleop_L2" || key === "teleop_L3" || key === "teleop_L4" || key === "teleop_net" || key === "teleop_processor" || key === "driver_rating") {
        value = parseInt(value);
        if (isNaN(value)) {
            alert("Could not convert value to integer.");
            return;
        }
    }

    if (key === "leave") {
        if (value === "true" || value === "false")
            value = value === "true";
        else {
            alert("Could not convert " + value + " to boolean.");
            return;
        }
    }    

    if (key === "match" || key === "team_number" || key === "name") {
        localStorage.setItem(getSaveName(match.match, match.team_number, match.name, true), JSON.stringify(match));
        localStorage.removeItem(getSaveName(match.match, match.team_number, match.name, false));
    }

    match[key] = value;

    localStorage.setItem(getSaveName(match.match, match.team_number, match.name, false), JSON.stringify(match));
}


function createMatchSelectors(prefix, element ){
    const savedMatches = getSavedMatchesByPrefix(prefix);
    const matchContainer = document.getElementById(element);
    for (let i = 0; i < savedMatches.length; i++) {
        const match = savedMatches[i];
        const button = document.createElement('button');
        
        button.classList.add("btn");
        button.id = i;
        if(element === 'match-container'){
            button.addEventListener('click', () => showMatchDetails(match));
            button.innerHTML = "Details";
        }
        if(element === 'archive-container'){
            button.addEventListener('click', () => moveToStorage(match));
            button.innerHTML = "Retrieve";

        }

        const label = document.createElement('label');
        let labelText = "";
        switch (match.match[0]) {
            case "T": labelText += "Practice "; break;
            case "Q": labelText += "Qualifier "; break;
            case "P": labelText += "Playoff "; break;
        }
        labelText += match.match.substring(1);
        labelText += " ";
        label.innerHTML = labelText;
        label.htmlFor = i;

        matchContainer.appendChild(label);
        matchContainer.appendChild(button);

        const br = document.createElement('br');
        const br2 = document.createElement('br');
        matchContainer.appendChild(br);
        matchContainer.appendChild(br2);
    };
}
function moveToStorage(match){
    localStorage.setItem(getSaveName(match.match, match.team_number, match.name, false), JSON.stringify(match));
    localStorage.removeItem(getSaveName(match.match, match.team_number, match.name, true));
    window.location.reload();
}
