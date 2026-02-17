import { isUrl, buildWaybackUrl } from './url-utils.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Wayback Machine URL Search",
    contexts: ["link", "selection"],
    id: "search-wayback-machine"
  });
});

// Handle context menu clicks
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

// Handle extension icon click - direct search without popup
chrome.action.onClicked.addListener(async (tab) => {
  const waybackUrl = buildWaybackUrl(tab.url);
  if (waybackUrl) {
    const newIndex = tab.index + 1;
    chrome.tabs.create({ url: waybackUrl, index: newIndex, openerTabId: tab.id })
      .catch((error) => console.error('Failed to create tab:', error));
  }
});
