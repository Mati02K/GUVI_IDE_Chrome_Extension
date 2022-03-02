'use strict';

// Check Extension On/OFF Status
chrome.storage.sync.get('extensionStatus', function(status) {
    let extensionStatus = status.extensionStatus;
    if(extensionStatus) {

        const API_PATH = 'https://guvi-api.codingpuppet.com/guvi2.0/model';

        const apiPath = 'ideNew.php';

        const sendRequest = (code, language, file_name = 'untitledExtension', userName = 'ExtensionUser') => {
            const sendDetails = {
                type: 'saveCode',
                fileName: file_name,
                userName: userName,
                ideCode: code,
                ideLanguageSelected: language,
                authtoken: null,
            };

            const jsonData = JSON.stringify(sendDetails);

            $.ajax({
                type: 'POST',
                data: {
                myData: jsonData,
                },
                timeout: 60000,
                url: `${API_PATH}/${apiPath}`,
            }).then((response) => {
                const output = JSON.parse(response);

                let id = null;
                if (output.status === 'success') {
                    id = output.uniqueId;
                }

                // Send the Id to Service Worker
                chrome.runtime.sendMessage(output, (response) => {
                    console.log('Sending Your Code');
                    console.log(response);
                });
            });
        };

        const idetifyLang = (code) => {
            const guessLang = new GuessLang();
            let programmingLang = 'cpp';
            guessLang.runModel(code).then((result) => {
                switch (result[0].languageId) {
                    case 'bat':
                        programmingLang = 'bash';
                        sendRequest(code, programmingLang);
                        break;
                    case 'c':
                        programmingLang = 'c';
                        sendRequest(code, programmingLang);
                        break;
                    case 'cpp':
                        programmingLang = 'cpp';
                        sendRequest(code, programmingLang);
                        break;
                    case 'clj':
                        programmingLang = 'clojure';
                        sendRequest(code, programmingLang);
                        break;
                    case 'go':
                        programmingLang = 'golang';
                        sendRequest(code, programmingLang);
                        break;
                    case 'cs':
                        programmingLang = 'csharp';
                        sendRequest(code, programmingLang);
                        break;
                    case 'java':
                        programmingLang = 'java';
                        sendRequest(code, programmingLang);
                        break;
                    case 'js':
                        programmingLang = 'javascript';
                        sendRequest(code, programmingLang);
                        break;
                    case 'py':
                        programmingLang = 'python';
                        sendRequest(code, programmingLang);
                        break;
                    case 'rb':
                        programmingLang = 'ruby';
                        sendRequest(code, programmingLang);
                        break;
                    case 'rs':
                        programmingLang = 'rust';
                        sendRequest(code, programmingLang);
                        break;
                    default:
                        programmingLang = 'cpp';
                        sendRequest(code, programmingLang);
                }
            });
        };

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
            idetifyLang(request.code);
            sendResponse('Running Your Code');
        });

    }
});
