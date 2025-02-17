import {Client, Databases} from 'https://esm.sh/appwrite@14.0.1';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');
const sessionId = localStorage.getItem("session");
const database = new Databases(client);
if(!sessionId) window.location.href = '../login/login.html';

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
//function to list all cookies
function listCookies() {
    // Remove the "session" cookie by setting its expiration date in the past.
    // Note: If the cookie was set with a specific path or domain, you may need to include those.
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
    // Retrieve the current cookies
    const cookieString = document.cookie;
    
    // If there are no cookies, return an empty object
    if (!cookieString) return {};
  
    // Split the cookie string into individual cookies (format: "name=value")
    const cookiesArray = cookieString.split('; ');
    
    // Create an object to store cookie names and their values
    const cookiesObj = {};
  
    cookiesArray.forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookiesObj[name] = value;
    });
    
    return cookiesObj;
  }
  
  // Example usage:
  console.log(listCookies());
  
  
  // Example usage:
  


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
    //get the sync button
    /*const sync = document.getElementById('sync')

    sync.addEventListener("click",()=>{
        const payload = {
            auto_coral_L1: auto_coral_1.value, 
            auto_coral_L2:auto_coral_2.value,
            auto_coral_L3:auto_coral_3.value,
            auto_coral_L4:auto_coral_4.value,
            
        }
        database.createDocument('sussex', 'testDatabase','1306', payload)
    });*/

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


    //auto ui
});

document.getElementById('submit').addEventListener('click', () => dumpScoutingDataToLocalStorage());

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

