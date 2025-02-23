import QrCreator from 'https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js';
import {getSavedMatches} from '../scout/script.js';

let availableSettings = ['text', 'radius', 'ecLevel', 'fill', 'background', 'size'];

var resultContainer = document.getElementById('qr-reader-results');
var lastResult, countResults = 0;

//scanner


// Initialize the QR code scanner
function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;
        // Handle on success condition with the decoded message.
        console.log(decodedText);
        result.innerHTML = decodedText;
    }
}

function onScanError(errorMessage) {
  // Handle scanning errors if needed
  if (errorMessage === "QR code parse error, error = D: No MultiFormat Readers were able to detect the code.") return;
  console.warn(errorMessage);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
  "qr_reader", { fps: 10, qrbox: 250 });
  html5QrcodeScanner.render(onScanSuccess);

// Set up the QR code scanner
const html5QrCode = new Html5Qrcode("qr_reader");

// Start the QR code scanner
html5QrCode.start(
  { facingMode: "environment" }, // Use the environment-facing camera
  { fps: 10, qrbox: 250 },       // Scan settings
  onScanSuccess,                 // Success callback
  onScanError                    // Error callback
).catch(err => {
  console.error("QR Code Scanner Error: ", err);
});


//creating

/**
 * Gets the settings for the qr code
 * @param {*} data String for QR code data
 */
function getQrCodeSettings(data) {
  let settings = {
    'text': data,
    'radius':0,
    'ecLevel':'L',
    'fill':'#000000',
    'background': null,
    'size': 500
  };
  
  return settings;
}

/**
 * Renders the QR code
 * @param {*} data String for QR code data
 */
function renderQrCode(data) {
  let time = new Date(),
    container = document.querySelector('#qr_code'),
    settings = getQrCodeSettings(data);
  container.innerHTML = '';
  QrCreator.render(settings, container);
}

document.getElementById('display_saved_matches').addEventListener('click', () => {
  const matches = getSavedMatches();
  let string = "";
  for(let i = 0; i < matches.length; i++) {
    string += JSON.stringify(matches[i]);
    if (i != matches.length - 1) string += ",";
  }
  console.log(string);
  renderQrCode(string);
});