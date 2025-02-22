import QrCreator from 'https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js';
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
        console.log(`Scan result ${decodedText}`, decodedResult);
        result.innerHTML = decodedText;
    }
}

function onScanError(errorMessage) {
  // Handle scanning errors if needed
  if (errorMessage === "QR code parse error, error = D: No MultiFormat Readers were able to detect the code.") return;
  console.warn(errorMessage);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
  "qr-reader", { fps: 10, qrbox: 250 });
  html5QrcodeScanner.render(onScanSuccess);

// Set up the QR code scanner
const html5QrCode = new Html5Qrcode("qr-reader");

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

function readSettings() {
  let settings = {};
  for (let setting of availableSettings) {
  settings[setting] = document.querySelector('#'+setting).value;
  }
  if (document.querySelector('#transparent').checked) {
  settings.background = null;
  }
  return settings;
}

function renderQrCode() {
  let time = new Date(),
    container = document.querySelector('#qr-code'),
    settings = readSettings();
  container.innerHTML = '';
  QrCreator.render(settings, container);
  document.querySelector('#stats').innerText = 'Rendered in ' + (new Date()-time) + 'ms';
  document.querySelector('#json').innerText = JSON.stringify(settings, null, 2);
}

for (let input of document.querySelectorAll('input, select')) {
  input.addEventListener('change', renderQrCode);
}
renderQrCode();