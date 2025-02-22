import QrCreator from 'https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js';
let availableSettings = ['text', 'radius', 'ecLevel', 'fill', 'background', 'size'];

function readSettings() {
  let settings = {}, el;
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
