// const guessLang = new GuessLang();
// guessLang.runModel('#include <stdio.h>\n\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n').then((result) => {
//     console.log(result);
// });
const idetifyLang = (code) => {
    let programmingLang = '';
    const guessLang = new GuessLang();
    guessLang.runModel(code).then((result) => {
        switch (result[0].languageId) {
            case 'bat':
                programmingLang = 'BASH';
                break;
            case 'c':
                programmingLang = 'C';
                break;
            case 'cpp':
                programmingLang = 'CPP';
                break;
            case 'clj':
                programmingLang = 'CLOJURE';
                break;
            case 'go':
                programmingLang = 'GO';
                break;
            case 'cs':
                programmingLang = 'C#';
                break;
            case 'java':
                programmingLang = 'JAVA';
                break;
            case 'js':
                programmingLang = 'JAVASCRIPT';
                break;
            case 'py':
                programmingLang = 'PYTHON';
                break;
            case 'rb':
                programmingLang = 'RUBY';
                break;
            case 'rs':
                programmingLang = 'RUST';
                break;
            default:
                programmingLang = 'CPP';
        }
    });
    return programmingLang;
};

const setLanguage = (langName) => {
    if (langName === 'C') {
    	editor.session.setMode('ace/mode/c_cpp');
    	editor.setValue('#include <stdio.h>\n\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n');
        editor.clearSelection();
    }
    else if (langName === 'CPP') {
    	editor.session.setMode('ace/mode/c_cpp');
    	editor.setValue('#include <iostream>\nusing namespace std;\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n');
        editor.clearSelection();
    }
    else if (langName === 'PYTHON') {
    	editor.session.setMode('ace/mode/python');
    	editor.setValue('# Enter your code here. Read input from STDIN. Print output to STDOUT');
        editor.clearSelection();
    }
    else if(langName === 'JAVASCRIPT') {
        editor.session.setMode('ace/mode/javascript');
        editor.setValue('//A Simple Hello World \n console.log("Hello World"); \n\n // Getting input via STDIN \n const readline = require("readline") \n console.log(readline);');
        editor.clearSelection();
    }
    else if (langName === 'JAVA') {
    	editor.session.setMode('ace/mode/java');
    	editor.setValue('import java.io.*;\n\nclass Main {\n\n    public static void main(String[] args) {\n        // Your code goes here\n   }\n}\n');
        editor.clearSelection();
    }
    else if (langName === 'BASH') {
    	editor.session.setMode('ace/mode/sh');
    	editor.setValue('#A Simple Hello World Program \n echo "Hello World" \n  #Getting input via STDIN \n read userInput \n echo "Input provided is: $userInput"');
        editor.clearSelection();
    }
    else if (langName === 'CLOJURE') {
    	editor.session.setMode('ace/mode/clojure');
    	editor.setValue(';A Simple Hello World Program \n (println "hello, world") \n\n ;Getting input via STDIN \n (def userInput (read-line)) \n (println "The Input Provided is: "userInput)');
        editor.clearSelection();
    }
    else if (langName === 'GO') {
    	editor.session.setMode('ace/mode/golang');
    	editor.setValue('package main \n import "fmt" \n func main() { \n //A Simple Hello World Program \n fmt.Println("hello, world") \n //Getting input via STDIN \n var userInput string \n fmt.Scanln(&userInput) \n fmt.Println("The Input Provided is: " + userInput) \n}');
        editor.clearSelection();
    }
    else if (langName === 'C#') {
    	editor.session.setMode('ace/mode/csharp');
    	editor.setValue('public class Hello { \n public static void Main() {  \n\n //A Simple Hello World Program \n System.Console.WriteLine("hello, world"); \n //Getting input via STDIN \n string userInput = System.Console.ReadLine(); \n System.Console.WriteLine("The Input Provided is: " + userInput); \n} \n}');
        editor.clearSelection();
    }
    else if (langName === 'RUBY') {
    	editor.session.setMode('ace/mode/ruby');
    	editor.setValue('#A Simple Hello World \n puts "hello, world" \n \n  #Getting input via STDIN \n userInput = gets \n puts "The Input Provided is: " + userInput');
        editor.clearSelection();
    }
    else if (langName === 'RUST') {
    	editor.session.setMode('ace/mode/rust');
    	editor.setValue('fn main() { \n //A Simple Hello World \n println!("hello, world"); \n //Getting input via STDIN \n let mut userInput = String::new(); \n std::io::stdin().read_line(&mut userInput).unwrap(); \n println!("The Input Provided is: {}", userInput); \n}');
        editor.clearSelection();
    }

};

// Function to change the mode of the editor as a different language is selected dynamically
// const changeMode = () => {
//     const options = document.getElementById("mode");
//     const modeValue = options.value;
//     setLanguage(modeValue);
// };
$('#mode').on('change', function() {
    const modeValue = this.value;
    setLanguage(modeValue);
  });

// $(document).ready(function() {
//     var my_awesome_script = document.createElement('script');

//     my_awesome_script.setAttribute('src','../js/vendor/guesslang.min.js');

//     document.head.appendChild(my_awesome_script);
// });

// Editor Settings
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
editor.session.setMode("ace/mode/c_cpp");
// const code = localStorage.getItem('guviCode');
//     if (code && code !== null) {
//         const lang = idetifyLang(code.code);
//         setLanguage(lang);
//         editor.setValue(code);
//         editor.clearSelection();
//         // localStorage.removeItem('guviCode'); 
//     }
//     else {
//         editor.setValue("#include <stdio.h>\n\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n");
//         editor.clearSelection();
//     }
// console.log(code);
chrome.storage.sync.get('code', function(code) {
    if (code.code) {
        console.log(code.code);
        // const lang = idetifyLang(code.code);
        // setLanguage(lang);
        editor.setValue(code.code);
        editor.clearSelection();
    }
    else {
        editor.setValue("#include <stdio.h>\n\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n");
        editor.clearSelection();
    }
});
// const bc = new BroadcastChannel("Guvi");
// bc.addEventListener('message', e => {
//     console.log(e);
// });
// function receiveMessage(e){
//     console.log(e.data);
// }
// window.addEventListener('message',receiveMessage);
// chrome.storage.sync.get('code', function(code) {
//     console.log("This is the code from the storage" + code.code);
//     $('#output').val(code.code);
// });
// localStorage.clear();
// localStorage.removeItem("guviCode");
// console.log(JSON.stringify(localStorage.getItem('guviCode2')));