chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "FROM_WEBPAGE" && request.payload.action === "OPEN_EXTENSION") {
    // Get the current window
    chrome.windows.getCurrent((window) => {
      // Get the current tab in the window
      chrome.tabs.query({ active: true, windowId: window.id }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab) {
          // Calculate position for popup
          const width = 400;  // popup width
          const height = 600; // popup height
          
          // Create a popup window
          chrome.windows.create({
            url: 'popup.html',
            type: 'popup',
            width: width,
            height: height,
            left: Math.round(window.left + (window.width - width)),
            top: Math.round(window.top),
            focused: true
          });
        }
      });
    });
  }
});