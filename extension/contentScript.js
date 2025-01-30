// content.js
(() => {
    // Listen for messages from the extension
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'receiveMessage') {
            // Post the received message to the webpage
            window.postMessage({
                type: "FROM_EXTENSION",
                payload: message.message
            }, "*");
        }
    });

    // Listen for messages from the webpage
    window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        
        if (event.data.type === "FROM_NEXTJS") {
            const { action, data } = event.data.payload;
            
            if (action === 'OPEN_EXTENSION') {
                // Forward message to extension
                chrome.runtime.sendMessage({
                    type: "FROM_WEBPAGE",
                    payload: {
                        action: action,
                        data: data
                    }
                });
                
                // Request to open extension popup
                chrome.runtime.sendMessage({
                    action: "open_popup"
                });
            }
        }
    });
})();
