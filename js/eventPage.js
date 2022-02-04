
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // for(let i = 0; i < message.length; i++){
    //     console.log(message[i].innerHTML);
    // }
    const ideURL = "../html/ide.html";
    // const ideURL = "http://127.0.0.1:5500/html/ide.html";
    const openIDE = {
        url : ideURL,
        type : "popup",
        top : 5,
        left : 5,
        width : message.width,
        height : message.height,
    };
    chrome.storage.sync.get('code', function(code) {
        console.log("Code from api", code.code);
    });
        // use window.open to create a popup
        // sandboxWin = chrome.windows.create(openIDE, function(){});

        // fire a postMessage event to the sandbox. Inspect the sandbox and see the 
          // message in the console.
        // sandboxWin.postMessage({"message":"It works!!"}, "*");
    chrome.windows.create(openIDE, function(){})
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