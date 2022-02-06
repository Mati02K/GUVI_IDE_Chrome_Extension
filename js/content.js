'use strict';

// Check Extension On Status
chrome.storage.sync.get('extensionStatus', function(status) {
    let extensionStatus = status.extensionStatus;
    if(extensionStatus) {
        $(document).ready(function(){
            $('.guvi-ide').click(function() {
                const code = $(this).data( "code" );
                //  Set the code in the chrome storage API
                chrome.storage.sync.set(
                    {code : code}
                    );
                const ideData = {
                    code : code,
                };
                // Send the code to event page to open the IDE
                chrome.runtime.sendMessage(ideData, (response) => {
                    console.log('Running Your Code');
                  });
              });
        });
        
        // Black List the IDE Where the Editor has no use
        const blackList = new Set(['https://www.w3schools.com', 'https://codepen.io', 'http://jsfiddle.net']);
        
        // Get the URL Of the current page to set the extension accordingly
        const URL = location.protocol + '//' + location.host; 
        
        // Below websites have the codes in the different format
        const specialWebsites = new Set(['https://www.geeksforgeeks.org', 'https://www.javatpoint.com', 'https://github.com'])
        
        // Render extension button layout for geekforgeek
        if ( specialWebsites.has(URL) && URL === 'https://www.geeksforgeeks.org') {
            const pre = document.getElementsByClassName('code');
            const holder = document.getElementsByClassName('syntaxhighlighter');
            for (let i = 0; i < pre.length; i++) {
                const lineTags = pre[i].childNodes[0].childNodes;
                const button = document.createElement('button');
                button.classList.add('guvi-ide');
                let parsedCode = '';
                for (let j = 0; j < lineTags.length; j++) {
                    parsedCode += lineTags[j].textContent;
                    parsedCode = parsedCode.replace(/\u00a0/g, ' '); // Replace &nbsp
                    parsedCode += '\n';            
                }             
                button.dataset.code = parsedCode;
                holder[i].appendChild(button);
            }
        }
        // Render extension button layout for javatpoint
        else if ( specialWebsites.has(URL) && URL === 'https://www.javatpoint.com') {
            const pre = document.getElementsByClassName('codeblock');
            for (let i = 0; i < pre.length; i++) {
                let code = pre[i].childNodes[1].defaultValue;
                code = code.replace(/\u00a0/g, ' ');
                const button = document.createElement("button");
                button.classList.add('guvi-ide')
                button.style.float = 'none';
                button.style.marginLeft = '90%';
                button.style.marginBottom = '15px';
                button.dataset.code = code;
                pre[i].appendChild(button);
            }
        }
        // Render extension button layout for github
        else if ( specialWebsites.has(URL) && URL === 'https://github.com') {
            const parentElement = document.getElementsByClassName('js-blob-code-container');
            const pre = document.getElementsByTagName('tr');
            let code = '';
            for (let i = 0; i < pre.length; i++) {
                let parsedCode = pre[i].textContent;
                parsedCode = parsedCode.replace(/\u00a0/g, ' ');
                parsedCode = parsedCode.replace(/\n/g, '');
                parsedCode = parsedCode.trim();
                code = code + parsedCode;
                code += '\n';
            }
            const button = document.createElement('button');
            button.classList.add('guvi-ide')
            button.dataset.code = code;
            parentElement[0].appendChild(button);
        }
        // Render extension button layout for other all websites
        else if ( !blackList.has(URL) ) {
            const pre = document.getElementsByTagName('pre');
            for (let i = 0; i < pre.length; i++) {
                let code = pre[i].textContent;
                code = code.replace(/\u00a0/g, ' ');
                if (code.trim().length > 25) {
                    const button = document.createElement('button');
                    button.classList.add('guvi-ide')
                    button.dataset.code = code;
                    pre[i].appendChild(button);
                }
            }
        }       

    }
});
