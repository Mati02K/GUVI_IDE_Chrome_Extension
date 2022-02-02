// chrome.runtime.sendMessage({todo : 'getCode'});

$(document).ready(function(){

    // let code = document.getElementsByTagName('pre')[0].innerHTML; --> For Particular One Code
    
    let code = document.getElementsByTagName('pre');

    chrome.runtime.sendMessage(code, (response) => {
        // 3. Got an asynchronous response with the data from the background
        console.log('Sending user data', response);
      });
  
  });