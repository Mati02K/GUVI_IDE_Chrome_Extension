'use strict';

chrome.storage.sync.get('extensionStatus', function(status) {
    let extensionStatus = status.extensionStatus;
    if(extensionStatus) {
        const openEditor = () => {

            const ideURL = "../html/ide.html";
            const openIDE = {
                url : ideURL,
                type : "popup",
                top : 5,
                left : 5,
                width : 750,
                height :550,
            };
            
            chrome.windows.create(openIDE, function(){})
        };

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            openEditor();
        });

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
                chrome.storage.sync.set(
                    {code : code}
                    )
                openEditor();
            }
        });
    }
});