
// Setting the properties of the Context Menu Item
let contextMenuItem = {
    id : 'guviIDE',
    title : 'Guvi IDE',
    contexts : ['selection']
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(option) {
    if (option.menuItemId == 'guviIDE' && option.selectionText) {
        const code = option.selectionText;
        console.log(code);
    }
});