(() => {
  // Listen for messages from the webpage
  window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    
    if (event.data.type === "FROM_NEXTJS") {
      const { action, data } = event.data.payload;
      
      if (action === "OPEN_EXTENSION") {
        // Forward the message to the background script
        chrome.runtime.sendMessage({
          type: "FROM_WEBPAGE",
          payload: {
            action: action,
            data: data
          }
        });
      }
    }
  });

  // Let the webpage know the extension is ready
  window.postMessage({
    type: "FROM_EXTENSION",
    payload: "EXTENSION_READY"
  }, "*");
})();
