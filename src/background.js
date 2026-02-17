import { isUrl, buildWaybackUrl } from './url-utils.js';
import { getSettings } from './settings.js';

// Apply popup setting
async function applyPopupSetting() {
  const settings = await getSettings();
  if (settings.popupEnabled) {
    chrome.action.setPopup({ popup: 'popup.html' });
  } else {
    chrome.action.setPopup({ popup: '' });
  }
}

// Apply popup setting on service worker startup
applyPopupSetting();

// Listen for settings changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.popupEnabled) {
    if (changes.popupEnabled.newValue) {
      chrome.action.setPopup({ popup: 'popup.html' });
    } else {
      chrome.action.setPopup({ popup: '' });
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Wayback Machine URL Search",
    contexts: ["link", "selection"],
    id: "search-wayback-machine"
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-wayback-machine") {
    let waybackUrl = "";
    if (info.linkUrl) {
      waybackUrl = buildWaybackUrl(info.linkUrl);
    } else if (info.selectionText && isUrl(info.selectionText.trim())) {
      waybackUrl = buildWaybackUrl(encodeURIComponent(info.selectionText.trim()));
    }
    if (waybackUrl) {
      const newIndex = tab.index + 1;
      chrome.tabs.create({ url: waybackUrl, index: newIndex, openerTabId: tab.id })
        .catch((error) => console.error('Failed to create tab:', error));
    }
  }
});
