// Check Extension On Status

chrome.storage.sync.get('extensionStatus', function(status) {
    let extensionStatus = status.extensionStatus;
    console.log(extensionStatus);
    if(extensionStatus) {

        $(document).ready(function(){
            $('.guvi-ide').click(function() {
                const code = $(this).data( "code" );
                //  Set the code in the chrome storage API
                chrome.storage.sync.set(
                    {code : code}
                    )
                // localStorage.setItem('guviCode', $(this).data( "code" ));
                // console.log(localStorage.getItem('guviCode'));
                const ideData = {
                    code : code,
                    height : parseInt(screen.availHeight / 2, 10) + 200,
                    width : parseInt(screen.availWidth / 2 , 10) + 100,
                }
                chrome.runtime.sendMessage(ideData, (response) => {
                    console.log(screen.availWidth);
                    console.log('Running Your Code', response);
                  });
              });
        });
        
        // Black List the IDE Where the Editor has no use
        const blackList = new Set(['https://www.w3schools.com', 'https://codepen.io', 'http://jsfiddle.net']);
        
        const URL = location.protocol + '//' + location.host; 
        console.log(URL);
        
        const specialWebsites = new Set(['https://www.geeksforgeeks.org', 'https://www.javatpoint.com', 'https://github.com'])
        
        if ( specialWebsites.has(URL) && URL === 'https://www.geeksforgeeks.org') {
            const pre = document.getElementsByClassName('code');
            const holder = document.getElementsByClassName('syntaxhighlighter');
            console.log(holder);
            console.log(pre[0].childNodes[0].childNodes[0].textContent);
            for (let i = 0; i < pre.length; i++) {
                const lineTags = pre[i].childNodes[0].childNodes;
                const button = document.createElement('button');
                button.classList.add('guvi-ide');
                let parsedCode = '';
                for (let j = 0; j < lineTags.length; j++) {
                    parsedCode += lineTags[j].textContent;
                    parsedCode = parsedCode.replace(/\u00a0/g, ' ');
                    parsedCode += '\n';            
                }             
                button.dataset.code = parsedCode;
                console.log(parsedCode);
                // pre[i].childNodes[0].appendChild(button);
                holder[i].appendChild(button);
            }
        }
        else if ( specialWebsites.has(URL) && URL === 'https://www.javatpoint.com') {
            const pre = document.getElementsByClassName("codeblock");
            console.log(pre[0].childNodes[1].defaultValue);
            for (let i = 0; i < pre.length; i++) {
                let code = pre[i].childNodes[1].defaultValue;
                code = code.replace(/\u00a0/g, ' ');
                const button = document.createElement("button");
                button.classList.add("guvi-ide")
                button.style.float = 'none';
                button.style.marginLeft = '90%';
                button.style.marginBottom = '15px';
                button.dataset.code = code;
                pre[i].appendChild(button);
            }
        }
        else if ( specialWebsites.has(URL) && URL === 'https://github.com') {
            const parentElement = document.getElementsByClassName('js-blob-code-container');
            const pre = document.getElementsByTagName('tr');
            console.log(pre);
            let code = '';
            for (let i = 0; i < pre.length; i++) {
                let parsedCode = pre[i].textContent;
                parsedCode = parsedCode.replace(/\u00a0/g, ' ');
                parsedCode = parsedCode.replace(/\n/g, '');
                parsedCode = parsedCode.trim();
                // parsedCode = parsedCode.replace(/ /g, '');
                code = code + parsedCode;
                code += '\n';
            }
            const button = document.createElement('button');
            button.classList.add('guvi-ide')
            button.dataset.code = code;
            console.log(parentElement);
            parentElement[0].appendChild(button);
            console.log(code);
        }
        else if ( !blackList.has(URL) ) {
            const pre = document.getElementsByTagName("pre");
            for (let i = 0; i < pre.length; i++) {
                let code = pre[i].textContent;
                code = code.replace(/\u00a0/g, ' ');
                if (code.trim().length > 25) {
                    const button = document.createElement("button");
                    button.classList.add("guvi-ide")
                    button.dataset.code = code;
                    pre[i].appendChild(button);
                }
            }
        }       
        
        }
  });
