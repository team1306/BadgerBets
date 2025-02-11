import {Client} from 'appwrite';
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');
const sessionId = localStorage.getItem("session");
if(!sessionId) window.location.href = '../login/login.html';
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
        this.checkbox = document.getElementById(id);
        this.updateScoreCallback = updateScoreCallback;

        // Attach event listener
        this.checkbox.addEventListener('click', () => this.update());
    }

    update() {
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



document.addEventListener('DOMContentLoaded', () => {
    var currentMode = document.getElementById('currentMode');
    var button = document.getElementById('toggleButton');
    button.addEventListener('click', () => {
        if (button.textContent === "Switch to Teleop") {
            button.textContent = "Switch to Auto";
            hideSectionById('autonomous');
            showSectionById('teleop');
            currentMode.innerHTML = "Current Mode: Teleop";
        }
        else if (button.textContent === "Switch to Auto") {
            button.textContent = "Switch to Teleop";
            hideSectionById('teleop');
            showSectionById('autonomous');
            currentMode.innerHTML = "Current Mode: Auto";
        }
        else {throw new Error();}
    });

    const updateFinalScore = () => {
        const didMoveInAuto = document.getElementById('leave').value;
        if (didMoveInAuto) {
            const movedMultiplier = 1;
        }
        else{
            const movedMultiplier = 0;
        }
        const finalAutoScore = document.getElementById('finalAutoScore');
        const finalAutoScoreText =auto_coral_1.inputField.value * 3 + auto_coral_2.inputField.value * 4 +auto_coral_3.inputField.value * 6 + auto_coral_4.inputField.value * 7+auto_algae_processor.inputField.value * 6+auto_algae_net.inputField.value * 5+movedMultiplier*3;
        finalAutoScore.innerHTML ="Final Auto Score: "+  finalAutoScoreText.toString();
        const finalTeleScore = document.getElementById('finalTeleScore');
        const finalTeleScoreText =tele_coral_1.inputField.value*2+tele_coral_2.inputField.value*3+tele_coral_3.inputField.value*4+tele_coral_4.inputField.value*5+tele_algae_processor.inputField.value*6+tele_algae_net.inputField.value*7;
        finalTeleScore.innerHTML ="Final Teleop Score: "+  finalTeleScoreText.toString();
        const finalScore = document.getElementById('finalScore');
        finalScore.innerHTML ="Final Score: "+  (finalAutoScoreText+finalTeleScoreText).toString();
    };
    //auto ui
    //TODO: add a leave checkbox
    const auto_coral_1 = new CoralCounter('increment1', 'decrement1', 'input1', updateFinalScore);
    const auto_coral_2 = new CoralCounter('increment2', 'decrement2', 'input2', updateFinalScore);
    const auto_coral_3 = new CoralCounter('increment3', 'decrement3', 'input3', updateFinalScore);
    const auto_coral_4 = new CoralCounter('increment4', 'decrement4', 'input4', updateFinalScore);
    const auto_algae_processor = new CoralCounter('increment5', 'decrement5', 'input5', updateFinalScore);
    const auto_algae_net = new CoralCounter('increment6', 'decrement6', 'input6', updateFinalScore);
    const auto_leave = new Checkbox('leave', updateFinalScore);
    //tele ui
    const tele_coral_1 = new CoralCounter('increment7', 'decrement7', 'input7', updateFinalScore);
    const tele_coral_2 = new CoralCounter('increment8', 'decrement8', 'input8', updateFinalScore);
    const tele_coral_3 = new CoralCounter('increment9', 'decrement9', 'input9', updateFinalScore);
    const tele_coral_4 = new CoralCounter('increment10', 'decrement10', 'input10', updateFinalScore);
    const tele_algae_processor = new CoralCounter('increment11', 'decrement11', 'input11', updateFinalScore);
    const tele_algae_net = new CoralCounter('increment12', 'decrement12', 'input12', updateFinalScore);
    
});
//let isAuto = true;

