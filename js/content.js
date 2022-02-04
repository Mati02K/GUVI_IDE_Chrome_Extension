// chrome.runtime.sendMessage({todo : 'getCode'});


// let btn, t;
// let x = document.querySelectorAll("pre");
// for (let i = 0; i < x.length; i++) {
//   btn = document.createElement("button");
//   t = document.createTextNode("Run");
//   btn.appendChild(t);
//   x[i].appendChild(btn);
// }
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

// $('<div id = "newElement" style="display:none"></div>').prependTo($('body'));   
// $("#newElement").append('<iframe id="receiver" src="" width="500" height="200"></iframe>');

const blackList = new Set(["https://www.w3schools.com"]);

const URL = location.protocol + '//' + location.host; 
console.log(URL);

const specialWebsites = new Set(["https://www.geeksforgeeks.org"])

if ( specialWebsites.has(URL) ) {
    const pre = document.getElementsByClassName("code");
    console.log(pre);
    console.log(pre[0].childNodes[0].childNodes[0].textContent);
    for (let i = 0; i < pre.length; i++) {
        const lineTags = pre[i].childNodes[0].childNodes;
        const button = document.createElement("button");
        button.classList.add("guvi-ide")
        let parsedCode = '';
        for (let j = 0; j < lineTags.length; j++) {
           // code = code.replace(/\u00a0/g, '\n'); // Replace &nbsp
            parsedCode += lineTags[j].textContent;
            parsedCode = parsedCode.replace(/\u00a0/g, ' ');
            parsedCode += '\n';            
        }             
        button.dataset.code = parsedCode;
        console.log(parsedCode);
        pre[i].appendChild(button);
    }
}
else if ( !blackList.has(URL) ) {
    const pre = document.getElementsByTagName("pre");
    for (let i = 0; i < pre.length; i++) {
        const code = pre[i].textContent;
        if (code.trim().length > 25) {
            const button = document.createElement("button");
            // button.innerHTML = "Run";
            button.classList.add("guvi-ide")
            button.dataset.code = code;
            pre[i].appendChild(button);
        }
        // const ideData = {
        //     code : code,
        //     height : parseInt(screen.availHeight / 2, 10) + 200,
        //     width : parseInt(screen.availWidth / 2 , 10) + 100,
        // }
        // button.addEventListener ("click", function() {
        //     //  Set the code in the chrome storage API
        //     chrome.storage.sync.set(
        //         {code : code}
        //         )
        //     //localStorage.setItem('guviCode', code); // Until we find a solution
        //     //  Then send it to the background file
        //     chrome.runtime.sendMessage(ideData, (response) => {
        //         console.log(screen.availWidth);
        //         console.log('Running Your Code', response);
        //       });
        //   }); 
    }
}

// const codeTag = document.getElementsByTagName("code");

// for (let i = 0; i < codeTag.length; i++) {
//     const button = document.createElement("button");
//     button.innerHTML = "Run";
//     codeTag[i].appendChild(button);
// }

// $(document).ready(function(){

//     // let code = document.getElementsByTagName('pre')[0].innerHTML; // --> For Particular One Code
    
//     // let code = document.getElementsByTagName('pre');

//     // 1. Create the button
//     // const button = document.createElement("button");
//     // button.innerHTML = "Run";

//     // const pre = document.getElementsByTagName("pre");
  
//     // for (let i = 0; i < pre.length; i++) {
//     //     pre[i].appendChild(button);
//     // }

//     let code = $('pre').html();

//     // let code = document.getElementsByTagName('code')[0].innerHTML;

//     // chrome.runtime.sendMessage(code, (response) => {
//     //     console.log('Sending user data', response);
//     //   });
  
//   });