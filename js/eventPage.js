'use strict';

// Setting the properties of the Context Menu Item on selection of text
const contextMenuItem = {
    id : 'guviIDE',
    title : 'Guvi IDE',
    contexts : ['selection']
};

chrome.contextMenus.create(contextMenuItem, () => chrome.runtime.lastError);  // supressing if already installed error

const invokeSelectionText = (extensionStatus) => {

    if(extensionStatus === true) {

    // Update the current status
    const updateProperty = {
        enabled : true,
    };

    chrome.contextMenus.update('guviIDE', updateProperty);

    const openEditor = () => {
        let received = false;
        // Get the ID response from Content Script
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (received === false) {
                received = true;
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
                chrome.windows.create(openIDE);
            }
        });
    };

    chrome.contextMenus.onClicked.addListener(function(option) {
        if (option.menuItemId === 'guviIDE' && option.selectionText) {
            let code = option.selectionText;
            code = code.replace(/  +/g, '\n'); // Replace empty spaces with new lines
            code = code.replace(/\u00a0/g, ' '); // Replace &nbsp
            // Save the Code First 
            chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {code: code}, function(response) {
                    // Create a notification
                    const notifOptions = {
                        type : 'basic',
                        iconUrl : '../icons/logo.png',
                        title : 'GUVI IDE',
                        message : 'Your Code has been opened in the IDE',
                    };
                    chrome.notifications.create('ideStatus',notifOptions);
                    console.log(response);
                });
            });

            // Open the IDE Next
            // openEditor();
        }
    });
    } else {
        const updateProperty = {
            enabled : false,
        };
        chrome.contextMenus.update('guviIDE', updateProperty);
    }
};

// Check Extension On/OFF Status

chrome.storage.sync.get('extensionStatus', function(status) {
    const extensionStatus = status.extensionStatus;
    invokeSelectionText(extensionStatus);
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.extensionStatus) {
        const extensionStatus = changes.extensionStatus.newValue;
        invokeSelectionText(extensionStatus);
    }
});