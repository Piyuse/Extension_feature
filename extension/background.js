// background.js (JS version)

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "open_popup") {
    chrome.action.openPopup(); // Opens the Chrome extension popup
  }
});
