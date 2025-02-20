import {Client, Databases} from 'https://esm.sh/appwrite@14.0.1';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');
const sessionId = localStorage.getItem("session");
const databases = new Databases(client);
if(!sessionId) window.location.href = '../login/index.html';

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
 * @returns list of dictionaries 
 */
function getSavedMatches() {

    let dictionaries = [];

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key == "session") continue;

        let match = localStorage.getItem(key);

        dictionaries.push(JSON.parse(match));
    }

    return dictionaries;
}


document.addEventListener('DOMContentLoaded', () => {
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

    //code for switching from auto ui to teleop ui
    let currentMode = document.getElementById('currentMode');
    let button = document.getElementById('toggleButton');
    button.addEventListener('click', () => {
        //auto
        if (button.textContent === "Switch to Teleop") {
            button.textContent = "Switch to End";
            hideSectionById('autonomous');
            hideSectionById('end');
            showSectionById('teleop');
            currentMode.innerHTML = "Current Mode: Teleop";
        }
        //teleop
        else if (button.textContent === "Switch to End") {
            button.textContent = "Switch to Auto";
            hideSectionById('teleop');
            hideSectionById('autonomous');
            showSectionById('end');
            currentMode.innerHTML = "Current Mode: End";
        }
        //end
        else if (button.textContent === "Switch to Auto") {
            button.textContent = "Switch to Teleop";
            hideSectionById('teleop');
            hideSectionById('end');
            showSectionById('autonomous');
            currentMode.innerHTML = "Current Mode: Auto";
        }
        else {throw new Error();}
    });
    document.getElementById('submit').addEventListener('click', dumpScoutingDataToLocalStorage());
function dumpScoutingDataToLocalStorage() {
    const matchNumber = 0, teamNumber = 1306;
    const cookieName = "" + matchNumber + "-" + teamNumber;
    
    let climbState = 0;
    switch (climb_status.selectedOption) {
        case "none": climbState = 0; break;
        case "park": climbState = 1; break;
        case "shallow": climbState = 2; break;
        case "deep": climbState = 3; break;
    }
    let intakeAbilities = 0;
    switch (document.getElementById('intake_ability').value) {
        case "coral_station": intakeAbilities = 0; break;
        case "ground": intakeAbilities = 1; break;
        case "both": intakeAbilities = 2; break;
    }
    const dictionary = {
        "match": "T0",
        "team": 1306,
        "auto_L1": auto_coral_1.inputField.value,
        "auto_L2": auto_coral_2.inputField.value,
        "auto_L3": auto_coral_3.inputField.value,
        "auto_L4": auto_coral_4.inputField.value,
        "leave": auto_leave.isChecked,
        "auto_net": auto_algae_net.inputField.value,
        "auto_processor": auto_algae_processor.inputField.value,

        "teleop_L1": tele_coral_1.inputField.value,
        "teleop_L2": tele_coral_2.inputField.value,
        "teleop_L3": tele_coral_3.inputField.value,
        "teleop_L4": tele_coral_4.inputField.value,
        "teleop_net": tele_algae_net.inputField.value,
        "teleop_processor": tele_algae_processor.inputField.value,

        "climb_state": climbState,
        "driver_rating": driver_ability.value,
        "intake_abilities": intakeAbilities,
        "notes": document.getElementById('notes').value
    };

    //TODO: send to appwrite database
    localStorage.setItem(cookieName, JSON.stringify(dictionary));
    console.log("Saved match data: " + localStorage.getItem(cookieName));
    }

document.getElementById("sync").addEventListener('click', () => syncToAppwrite('test'))
function syncToAppwrite(collectionID) {
    const databaseID = "match_data";
    const matches = getSavedMatches();
    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        
        const documentData = {
            auto_L1: match.auto_L1,
            auto_L2: match.auto_L2,
            auto_L3: match.auto_L3,
            auto_L4: match.auto_L4,
            leave: match.leave,
            auto_net: match.auto_net,
            auto_processor: match.auto_processor,
            teleop_L1: match.teleop_L1,
            teleop_L2: match.teleop_L2,
            teleop_L3: match.teleop_L3,
            teleop_L4: match.teleop_L4,
            teleop_net: match.teleop_net,
            teleop_processor: match.teleop_processor,
            climb_state: match.climb_state,
            driver_rating: match.driver_rating,
            intake_abilities: match.intake_abilities,
            notes: match.notes, // Include any other fields you want to save
        };

        databases.createDocument(databaseID, collectionID, "" + match.match + "-" + match.teamNumber, documentData)
        .then(document => {
            console.log("Document Created Successfully: " + key);
        }).catch(error => {
            console.error("Error Creating Document: " + error + "\n" + error.message);
        });
    }
}
});