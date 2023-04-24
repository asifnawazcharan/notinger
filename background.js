// Register service worker
navigator.serviceWorker.register('sw.js');

// Handle extension install or update
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed or updated');
});