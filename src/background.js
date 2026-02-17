import { isUrl } from './url-utils.js';

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "Wayback Machine URL Search",
    contexts: ["link", "selection"],
    id: "search-wayback-machine"
  });
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "search-wayback-machine") {
    let waybackUrl = "";
    if (info.linkUrl) {
      waybackUrl = "https://web.archive.org/web/*/" + info.linkUrl;
    } else if (info.selectionText && isUrl(info.selectionText.trim())) {
      waybackUrl = "https://web.archive.org/web/*/" + info.selectionText.trim();
    }
    if (waybackUrl !== "") {
      // Get the index for the new tab
      const newIndex = tab.index + 1;

      // Create a new tab next to the current one and set the current tab as the opener
      chrome.tabs.create({url: waybackUrl, index: newIndex, openerTabId: tab.id});
    }
  }
});
