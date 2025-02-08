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
    document.getElementById('toggleButton').addEventListener('click', () => {
        hideSectionById('autonomous');
        showSectionById('teleop');
       currentMode.innerHTML = "Current Mode: Teleop";
    });

    const updateFinalScore = () => {
        const finalScore = document.getElementById('finalScore');
        const finalScoreText =coral_1.inputField.value * 3 + coral_2.inputField.value * 4 +coral_3.inputField.value * 6 + coral_4.inputField.value * 7+algae_processor.inputField.value * 6;
        finalScore.innerHTML ="Final Auto Score: "+  finalScoreText.toString();
    };
    const coral_1 = new CoralCounter('increment1', 'decrement1', 'input1', updateFinalScore);
    const coral_2 = new CoralCounter('increment2', 'decrement2', 'input2', updateFinalScore);
    const coral_3 = new CoralCounter('increment3', 'decrement3', 'input3', updateFinalScore);
    const coral_4 = new CoralCounter('increment4', 'decrement4', 'input4', updateFinalScore);
    const algae_processor = new CoralCounter('increment5', 'decrement5', 'input5', updateFinalScore);
});
//let isAuto = true;

