import QRCode from 'qrcode';

export default {
  data() {
    return {
      inputData: ''
    };
  },
  methods: {
    // Triggered when the button is clicked
    onGenerateQRCode() {
      this.generateQRCode(this.inputData);
    },
    
    // Generate QR code from provided data
    generateQRCode(data) {
      // Clear any previous QR code
      document.getElementById('qrcode').innerHTML = '';

      // Generate a new QR code if data is not empty
      if (data) {
        QRCode.toCanvas(document.getElementById('qrcode'), data, function (error) {
          if (error) console.error(error);
          console.log('QR Code generated!');
        });
      } else {
        alert('Please enter some text or a URL.');
      }
    }
  }
};

