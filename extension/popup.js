
document.addEventListener('DOMContentLoaded', function() {
  
    const messageDiv = document.getElementById('message');
    const actionButton = document.getElementById('actionButton');
    const urlDisplay = document.getElementById('currentUrl');
    const timeDisplay = document.getElementById('currentTime');
    function updateTime() {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString();
    }
    updateTime();
    setInterval(updateTime, 1000);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        if (currentTab.url) {
            urlDisplay.textContent = currentTab.url;
        }
    });
    actionButton.addEventListener('click', function() {
        messageDiv.textContent = 'Button clicked!';
        chrome.runtime.sendMessage(
            {action: 'buttonClicked'},
            function(response) {
                if (response && response.message) {
                    messageDiv.textContent = response.message;
                }
            }
        );
    });
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.action === 'updateMessage') {
                messageDiv.textContent = request.message;
            }
            return true;
        }
    );
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            actionButton.click();
        }
    });
});
