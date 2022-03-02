'use strict';

// Check Extension On/OFF Status
chrome.storage.sync.get('extensionStatus', function(status) {
    let extensionStatus = status.extensionStatus;
    if(extensionStatus) {
        const openEditor = () => {
            
            // Get the ID response from Content Script
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                const id = message.uniqueId;
                let ideURL = 'http://localhost:8000/ide.html';
                let status = 'Error';
                let msg = 'Error Opening your Code';
                if ( id && id !== null) {
                    ideURL = `http://localhost:8000/ide.html?id=${id}`;
                    status = 'Success';
                    msg = 'Your code has been opened in the IDE!';
                }
                sendResponse('Opening the IDE');

                const openIDE = {
                    url : ideURL,
                    type : 'popup',
                    top : 5,
                    left : 5,
                    width : 750,
                    height :750,
                };
                
                // Create a notification
                const notifOptions = {
                    type : 'basic',
                    iconUrl : '../icons/logo.png',
                    title : status,
                    message : msg,
                };
                chrome.notifications.create('ideStatus',notifOptions);

                chrome.windows.create(openIDE, function(){})
            });
        };

        // Setting the properties of the Context Menu Item on selection of text
        const contextMenuItem = {
            id : 'guviIDE',
            title : 'Guvi IDE',
            contexts : ['selection']
        };

        chrome.contextMenus.create(contextMenuItem, () => chrome.runtime.lastError);  // supressing if already installed error

        chrome.contextMenus.onClicked.addListener(function(option) {
            if (option.menuItemId === 'guviIDE' && option.selectionText) {
                let code = option.selectionText;
                code = code.replace(/  +/g, '\n'); // Replace empty spaces with new lines
                code = code.replace(/\u00a0/g, ' '); // Replace &nbsp
                // Save the Code First 
                chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {code: code}, function(response) {
                        console.log(response);
                    });
                }); 
                // Open the IDE Next
                openEditor();
            }
        });
    }
});