import { buildWaybackUrl } from './url-utils.js';

document.getElementById('search-current-page').addEventListener('click', async () => {
  const status = document.getElementById('status');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      const waybackUrl = buildWaybackUrl(tab.url);
      await chrome.tabs.create({ url: waybackUrl, index: tab.index + 1, openerTabId: tab.id });
      window.close();
    } else {
      status.textContent = 'Unable to get the current page URL.';
    }
  } catch (error) {
    status.textContent = 'An error occurred. Please try again.';
    console.error('Popup error:', error);
  }
});
