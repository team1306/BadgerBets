var resultContainer = document.getElementById('qr-reader-results');
var lastResult, countResults = 0;

// Initialize the QR code scanner
function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;
        // Handle on success condition with the decoded message.
        console.log(`Scan result ${decodedText}`, decodedResult);
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