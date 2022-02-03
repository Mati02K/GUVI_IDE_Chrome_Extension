
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // for(let i = 0; i < message.length; i++){
    //     console.log(message[i].innerHTML);
    // }
    const ideURL = "http://127.0.0.1:5500/html/ide.html";
    const openIDE = {
        type : 'popup',
        url : ideURL,
        type : "popup",
        top : 5,
        left : 5,
        width : message.width,
        height : message.height,
    };
    chrome.windows.create(openIDE, function(){})
    chrome.storage.sync.get('code', function(code) {
        console.log("This is the code from the storage" + code.code);
    });
    console.log(message);  // This is the code
// console.log(message[0].innerHTML);
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
        const code = option.selectionText;
        console.log(code);
    }
});