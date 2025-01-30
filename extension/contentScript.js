
(() => {

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'receiveMessage') {
        
            window.postMessage({
                type: "FROM_EXTENSION",
                payload: message.message
            }, "*");
        }
    });

    window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        
        if (event.data.type === "FROM_NEXTJS") {
            const { action, data } = event.data.payload;
            
            if (action === 'OPEN_EXTENSION') {
           
                chrome.runtime.sendMessage({
                    type: "FROM_WEBPAGE",
                    payload: {
                        action: action,
                        data: data
                    }
                });
                
                
                chrome.runtime.sendMessage({
                    action: "open_popup"
                });
            }
        }
    });
})();
