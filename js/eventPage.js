
chrome.storage.sync.get('extensionStatus', function(status) {
    let extensionStatus = status.extensionStatus;
    console.log(extensionStatus);
    if(extensionStatus) {

        const openEditor = () => {

            const ideURL = "../html/ide.html";
            // const ideURL = "http://127.0.0.1:5500/html/ide.html";
            const openIDE = {
                url : ideURL,
                type : "popup",
                top : 5,
                left : 5,
                width : 750,
                height :550,
            };
            chrome.storage.sync.get('code', function(code) {
                console.log("Code from api", code.code);
            });

            chrome.windows.create(openIDE, function(){})

        };

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            openEditor();
            console.log(message);  // This is the code

        });


        // Setting the properties of the Context Menu Item
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
                chrome.storage.sync.set(
                    {code : code}
                    )
                openEditor();
            }
        });

}
});