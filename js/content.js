// chrome.runtime.sendMessage({todo : 'getCode'});


// let btn, t;
// let x = document.querySelectorAll("pre");
// for (let i = 0; i < x.length; i++) {
//   btn = document.createElement("button");
//   t = document.createTextNode("Run");
//   btn.appendChild(t);
//   x[i].appendChild(btn);
// }

const pre = document.getElementsByTagName("pre");

for (let i = 0; i < pre.length; i++) {
    const button = document.createElement("button");
    button.innerHTML = "Run";
    const code = pre[i].innerHTML;
    button.dataset.code = code;
    const ideData = {
        code : code,
        height : parseInt(screen.availHeight / 2, 10) + 200,
        width : parseInt(screen.availWidth / 2 , 10) + 100,
    }
    button.addEventListener ("click", function() {
        //  Set the code in the chrome storage API
        chrome.storage.sync.set(
            {code : code}
            )
        localStorage.setItem('guviCode', code); // Until we find a solution
        //  Then send it to the background file
        chrome.runtime.sendMessage(ideData, (response) => {
            console.log(screen.availWidth);
            console.log('Running Your Code', response);
          });
      });
    pre[i].appendChild(button);
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