import { getSettings, saveSettings } from './settings.js';

const popupToggle = document.getElementById('popup-toggle');
const saveStatus = document.getElementById('save-status');

// Load current settings
async function loadSettings() {
  const settings = await getSettings();
  popupToggle.checked = settings.popupEnabled;
}

// Save when toggle changes
popupToggle.addEventListener('change', async () => {
  await saveSettings({ popupEnabled: popupToggle.checked });
  saveStatus.textContent = 'Settings saved.';
  setTimeout(() => { saveStatus.textContent = ''; }, 2000);
});

loadSettings();
