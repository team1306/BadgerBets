import {Client, Databases} from 'https://esm.sh/appwrite@14.0.1';
import {getUser} from '../AppwriteStuff.js';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');
const databases = new Databases(client);

let name;

let auto_coral_1, auto_coral_2, auto_coral_3, auto_coral_4, auto_algae_processor, auto_algae_net, auto_leave;
let tele_coral_1, tele_coral_2, tele_coral_3, tele_coral_4, tele_algae_processor, tele_algae_net;
let climb_status, driver_ability;

class CoralCounter {
    constructor(incrementId, decrementId, inputId, updateScoreCallback) {
        this.incrementButton = document.getElementById(incrementId);
        this.decrementButton = document.getElementById(decrementId);
        this.inputField = document.getElementById(inputId);
        this.updateScoreCallback = updateScoreCallback;

        // Attach event listeners
        this.incrementButton.addEventListener('click', () => this.increment());
        this.decrementButton.addEventListener('click', () => this.decrement());
    }
    increment() {
        const currentValue = parseInt(this.inputField.value, 10);
        this.inputField.value = currentValue + 1;
        this.updateScoreCallback();
    }

    decrement() {
        const currentValue = parseInt(this.inputField.value, 10);
        if (currentValue > 0) { // Prevent negative values if not desired
            this.inputField.value = currentValue - 1;
            this.updateScoreCallback();
        }
    }
}
class Checkbox { 

    constructor(id, updateScoreCallback) {
        this.isChecked = false; 

        this.checkbox = document.getElementById(id);
        this.updateScoreCallback = updateScoreCallback;

        // Attach event listener
        this.checkbox.addEventListener('click', () => this.update());
    }

    update() {
        this.isChecked = this.checkbox.checked;

        this.updateScoreCallback();
    }   
}

class OptionSelect { 

    constructor(id, updateScoreCallback) {
        

        this.optionSelect = document.getElementById(id);
        this.updateScoreCallback = updateScoreCallback;

        this.selectedOption = "none";
        // Attach event listener
        this.optionSelect.addEventListener('click', () => this.update());
    }

    update() {
        this.selectedOption = this.optionSelect.value;

        this.updateScoreCallback();
    }   
}

function hideSectionById(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'none';
    } else {
        console.log('Section with ID ' + sectionId + ' not found.');
    }
}

function showSectionById(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block'; // Or 'inline-block', depending on the section type
    } else {
        console.log('Section with ID ' + sectionId + ' not found.');
    }
}

/**
 * 
 * @param {String} matchID match type + match number
 * @param {int} teamNumber number of the team scouted
 * @param {String} userName name of the user who scouted
 * @param {Boolean} archived whether the match is archived or not
 * @returns 
 */
export function getSaveName(matchID, teamNumber, userName, archived) {
    return (archived ? "ARCHIVE_" : "") + "MATCH_" + matchID + "-" + teamNumber + "-" + userName;
}

/**
 * Gets matches saved in local storage based on the starting characters of the key
 * @param {String} prefix 
 * @returns list of dictionaries from local storage
 */
export function getSavedMatchesByPrefix(prefix) {
    let dictionaries = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.startsWith(prefix)) continue; // thanks to connor mulligan this also skips archived entries
        let match = localStorage.getItem(key);
        console.log(key);
        dictionaries.push(JSON.parse(match));
    }
    return dictionaries;
}
/**
 * NOTE FROM ETHAN SANDERS -- DO NOT DO THIS! CODE SHOULD NOT BE REUSED
 * @returns list of archived matches dictionaries 
 */
export function getArchivedMatches() {
    
}

document.addEventListener('DOMContentLoaded', async () => {

    const user = await getUser();
    name = user.name;
    console.log(name);

    //UI
    const updateFinalScore = () => {
        console.log(auto_leave.isChecked);
        const finalAutoScore = document.getElementById('finalAutoScore');
        const finalAutoScoreText =
            auto_coral_1.inputField.value * 3 +
            auto_coral_2.inputField.value * 4 +
            auto_coral_3.inputField.value * 6 +
            auto_coral_4.inputField.value * 7 +
            auto_algae_processor.inputField.value * 6 +
            auto_algae_net.inputField.value * 5 +
            (auto_leave.isChecked ? 3 : 0); //if it is checked, value is 3, otherwise 0
        finalAutoScore.innerHTML = "Final Auto Score: "+  finalAutoScoreText.toString();

        const finalTeleScore = document.getElementById('finalTeleScore');
        const finalTeleScoreText = 
            tele_coral_1.inputField.value * 2 +
            tele_coral_2.inputField.value * 3 +
            tele_coral_3.inputField.value * 4 +
            tele_coral_4.inputField.value * 5 +
            tele_algae_processor.inputField.value * 6 +
            tele_algae_net.inputField.value * 7;
        finalTeleScore.innerHTML = "Final Teleop Score: "+  finalTeleScoreText.toString();

        let climbScore = 0;
        switch (climb_status.selectedOption) {
            case "park": climbScore = 2; break;
            case "shallow": climbScore = 6; break;
            case "deep": climbScore = 12; break;
        }

        const finalScoreElement = document.getElementById('finalScore');
        let finalScore = finalAutoScoreText + finalTeleScoreText + climbScore;
        finalScoreElement.innerHTML = "Final Score: " + finalScore;
    };
    auto_coral_1 = new CoralCounter('increment1', 'decrement1', 'input1', updateFinalScore);
    auto_coral_2 = new CoralCounter('increment2', 'decrement2', 'input2', updateFinalScore);
    auto_coral_3 = new CoralCounter('increment3', 'decrement3', 'input3', updateFinalScore);
    auto_coral_4 = new CoralCounter('increment4', 'decrement4', 'input4', updateFinalScore);
    auto_algae_processor = new CoralCounter('increment5', 'decrement5', 'input5', updateFinalScore);
    auto_algae_net = new CoralCounter('increment6', 'decrement6', 'input6', updateFinalScore);
    auto_leave = new Checkbox('auto_leave', updateFinalScore);

    //tele ui
    tele_coral_1 = new CoralCounter('increment7', 'decrement7', 'input7', updateFinalScore);
    tele_coral_2 = new CoralCounter('increment8', 'decrement8', 'input8', updateFinalScore);
    tele_coral_3 = new CoralCounter('increment9', 'decrement9', 'input9', updateFinalScore);
    tele_coral_4 = new CoralCounter('increment10', 'decrement10', 'input10', updateFinalScore);
    tele_algae_processor = new CoralCounter('increment11', 'decrement11', 'input11', updateFinalScore);
    tele_algae_net = new CoralCounter('increment12', 'decrement12', 'input12', updateFinalScore);

    //end ui
    climb_status = new OptionSelect("climb_status", updateFinalScore);
    driver_ability = document.getElementById('driverRating');
    driver_ability.addEventListener('input', () => {
        document.getElementById('displayDriverRating')
        .innerHTML = "Driver Ability: " + driver_ability.value;
    });

    //new switch thingy
    const auto_button = document.getElementById('autoButton');
    const teleop_button = document.getElementById('teleopButton');
    const end_button = document.getElementById('endButton');

    auto_button.addEventListener('click', () => {
        hideSectionById('teleop');
        hideSectionById('end');
        showSectionById('autonomous');
        auto_button.style.backgroundColor = '#787804';
        teleop_button.style.backgroundColor = '#cccc00';
        end_button.style.backgroundColor = '#cccc00';

    }
    );
    teleop_button.addEventListener('click', () => {
        hideSectionById('autonomous');
        hideSectionById('end');
        showSectionById('teleop');
        auto_button.style.backgroundColor = '#787804';
        teleop_button.style.backgroundColor = '#cccc00';
        end_button.style.backgroundColor = '#cccc00';

    }
    );
    end_button.addEventListener('click', () => {
        hideSectionById('autonomous');
        hideSectionById('teleop');
        showSectionById('end');
    }
    );


document.getElementById('submit').addEventListener('click', () => dumpScoutingDataToLocalStorage());
function dumpScoutingDataToLocalStorage() {
    try {
        const matchType = document.getElementById('match_type').value;
        const matchNumber = document.getElementById('match_number').value;
        const teamNumber = document.getElementById('team_number').value;
        const allianceRole = document.getElementById('alliance_role').value;

        const saveName = "MATCH_" + matchType + matchNumber + "-" + teamNumber + "-" + name;

        const dictionary = {
            "match": matchType + matchNumber,
            "team_number": teamNumber,
            "alliance_role": allianceRole,
            "name": name,
            "auto_L1": parseInt(auto_coral_1.inputField.value),
            "auto_L2": parseInt(auto_coral_2.inputField.value),
            "auto_L3": parseInt(auto_coral_3.inputField.value),
            "auto_L4": parseInt(auto_coral_4.inputField.value),
            "leave": auto_leave.isChecked,
            "auto_net": parseInt(auto_algae_net.inputField.value),
            "auto_processor": parseInt(auto_algae_processor.inputField.value),

            "teleop_L1": parseInt(tele_coral_1.inputField.value),
            "teleop_L2": parseInt(tele_coral_2.inputField.value),
            "teleop_L3": parseInt(tele_coral_3.inputField.value),
            "teleop_L4": parseInt(tele_coral_4.inputField.value),
            "teleop_net": parseInt(tele_algae_net.inputField.value),
            "teleop_processor": parseInt(tele_algae_processor.inputField.value),

            "climb_state": climb_status.selectedOption,
            "robot_role": document.getElementById("robot_role").value,
            "driver_rating": parseInt(driver_ability.value),
            "intake_abilities": document.getElementById('intake_ability').value,
            "notes": document.getElementById('notes').value
        };

        //TODO: send to appwrite database
        localStorage.setItem(saveName, JSON.stringify(dictionary));
        console.log("Saved match data: " + localStorage.getItem(saveName));
    } catch (error) {
        alert("Error saving match data");
        console.log(error.message);
        console.log(error);
        return;
    }
    alert("Successfully saved match data");
    window.location.href = window.location.href;
}

});
