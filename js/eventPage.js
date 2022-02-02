
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    for(let i = 0; i < message.length; i++){
        console.log(message[i].innerHTML);
    }
console.log(message);  // This is the code
});


// Setting the properties of the Context Menu Item
let contextMenuItem = {
    id : 'guviIDE',
    title : 'Guvi IDE',
    contexts : ['selection']
};

chrome.contextMenus.create(contextMenuItem, () => chrome.runtime.lastError);  // supressing if already installed error

chrome.contextMenus.onClicked.addListener(function(option) {
    if (option.menuItemId == 'guviIDE' && option.selectionText) {
        const code = option.selectionText;
        console.log(code);
    }
});