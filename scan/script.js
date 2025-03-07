var lastResult, countResults = 0;

//scanner


// Initialize the QR code scanner
function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        try {
            ++countResults;
            lastResult = decodedText;

            const dictionary = JSON.parse(decodedText);
            const saveName = "*" + dictionary.match + "-" + dictionary.team_number + "-" + dictionary.name;
            localStorage.setItem(saveName, JSON.stringify(dictionary));

            alert("Successfully scanned data.");
            console.log(dictionary);

            window.location.href = window.location.href;
        } catch (error) {
            alert("Error scanning data");
            console.log(error);
            console.log(error.message);
        }
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