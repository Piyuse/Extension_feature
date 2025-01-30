
document.addEventListener('DOMContentLoaded', function() {
    // Get references to UI elements (add these elements to your popup.html)
    const messageDiv = document.getElementById('message');
    const actionButton = document.getElementById('actionButton');
    const urlDisplay = document.getElementById('currentUrl');
    const timeDisplay = document.getElementById('currentTime');

    // Update current time
    function updateTime() {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString();
    }

    // Initialize time and update every second
    updateTime();
    setInterval(updateTime, 1000);

    // Get current tab URL
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        if (currentTab.url) {
            urlDisplay.textContent = currentTab.url;
        }
    });

    // Button click handler
    actionButton.addEventListener('click', function() {
        messageDiv.textContent = 'Button clicked!';
        
        // Example: Send message to background script
        chrome.runtime.sendMessage(
            {action: 'buttonClicked'},
            function(response) {
                if (response && response.message) {
                    messageDiv.textContent = response.message;
                }
            }
        );
    });

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.action === 'updateMessage') {
                messageDiv.textContent = request.message;
            }
            return true;
        }
    );

    // Example: Add keyboard shortcut listener
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            actionButton.click();
        }
    });
});