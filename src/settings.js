export const DEFAULT_SETTINGS = {
  popupEnabled: true
};

export async function getSettings() {
  const result = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  return result;
}

export async function saveSettings(settings) {
  await chrome.storage.sync.set(settings);
}
