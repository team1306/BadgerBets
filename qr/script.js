import QrCreator from 'https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js';
import {getSavedMatches} from '../scout/script.js';

let savedMatches, container = document.querySelector('#qr_code');;

//creating

/**
 * Gets the settings for the qr code
 * @param {String} data String for QR code data
 */
function getQrCodeSettings(data) {
  let settings = {
    'text': data,
    'radius':0,
    'ecLevel':'L',
    'fill':'#000000',
    'background': '#FFFFFF',
    'size': 400
  };
  
  return settings;
}

/**
 * Renders the QR code
 * @param {String} data String for QR code data
 */
function renderQrCode(data) {
  let time = new Date();
  let settings = getQrCodeSettings(data)
  QrCreator.render(settings, container);

  const match = JSON.parse(data);
  document.getElementById('description').innerHTML = "Displaying: Match " + match.match + " - Team " + match.team_number;
  
  alert("Successfully generated QR code.");
}

function clearPreviousQR() {
  try {
    //if nothing is there don't clear
    if (container.innerHTML === "") return;

    container.innerHTML = "";
    document.getElementById('description').innerHTML = "Displaying: None";
    console.log("cleared previous code");

    const match = savedMatches[0];
    const saveName = "*" + match.match + "-" + match.team_number + "-" + match.name;
    localStorage.removeItem(saveName);
    console.log("deleted save");

  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

document.getElementById('display_saved_matches').addEventListener('click', () => {
  try {
    savedMatches = getSavedMatches();
    clearPreviousQR();
    savedMatches = getSavedMatches();

    if (savedMatches.length == 0) {
      alert("The are no saved matches.");
      return;
    }

    const match = savedMatches[0];
    let string = JSON.stringify(match);
        
    console.log(string);
    renderQrCode(string);
    
  } catch (error) {
    alert("Error generating QR code.");
    console.log(error);
    console.log(error.message);
  }
});