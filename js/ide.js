'use strict';

const API_PATH = 'https://guvi-api.codingpuppet.com/guvi2.0/model';

const apiPath = 'extensionIDE.php';

let isLanguageSet = false; // This variable is used to check if already code is present in the editor when switching languages

const runCode = (code, lang = null) => {
    const cid = (lang === null) ? $('#mode option:selected').text() : lang;
    const sendDetails = {
        compilerId: cid,
        source: code,
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
        if(output.output) {
            let status = 'Success !!!';
            let msg = 'Your code has been successfully compiled.';
            if (output.output === 'Maximum Time Limit Exceeded' || ! output.compilationstatus) {
                status = 'Error !!!';
                msg = 'There is a problem running your code.Please check the language selected.';
            }
            const notifOptions = {
                type : 'basic',
                iconUrl : '../icons/logo.png',
                title : status,
                message : msg,
            };
            chrome.notifications.create('compilationStatus',notifOptions);
            $('#output').val(output.output);
        } else {
            $('#output').val('');
        }
        $('#compile').prop('disabled', false);
      });
};

const setLanguage = (langName) => {
    if (langName === 'C') {
    	editor.session.setMode('ace/mode/c_cpp');
        if ( !isLanguageSet ) {
            editor.setValue('#include <stdio.h>\n\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n');
            editor.clearSelection();
        }
    }
    else if (langName === 'CPP14') {
    	editor.session.setMode('ace/mode/c_cpp');
        if ( !isLanguageSet ) {
            editor.setValue('#include <iostream>\nusing namespace std;\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n');
            editor.clearSelection();
        }
    }
    else if (langName === 'PY3') {
    	editor.session.setMode('ace/mode/python');
        if ( !isLanguageSet ) {
            editor.setValue('# Enter your code here. Read input from STDIN. Print output to STDOUT');
            editor.clearSelection();
        }
    }
    else if(langName === 'JAVASCRIPT') {
        editor.session.setMode('ace/mode/javascript');
        if ( !isLanguageSet ) {
            editor.setValue('//A Simple Hello World \n console.log("Hello World"); \n\n // Getting input via STDIN \n const readline = require("readline") \n console.log(readline);');
            editor.clearSelection();
        }
    }
    else if (langName === 'JAVA8') {
    	editor.session.setMode('ace/mode/java');
        if ( !isLanguageSet ) {
            editor.setValue('import java.io.*;\n\nclass Main {\n\n    public static void main(String[] args) {\n        // Your code goes here\n   }\n}\n');
            editor.clearSelection();
        }
    }
    else if (langName === 'BASH') {
    	editor.session.setMode('ace/mode/sh');
        if ( !isLanguageSet ) {
            editor.setValue('#A Simple Hello World Program \n echo "Hello World" \n  #Getting input via STDIN \n read userInput \n echo "Input provided is: $userInput"');
            editor.clearSelection();
        }
    }
    else if (langName === 'CLOJURE') {
    	editor.session.setMode('ace/mode/clojure');
        if ( !isLanguageSet ) {
            editor.setValue(';A Simple Hello World Program \n (println "hello, world") \n\n ;Getting input via STDIN \n (def userInput (read-line)) \n (println "The Input Provided is: "userInput)');
            editor.clearSelection();
        }
    }
    else if (langName === 'GO') {
    	editor.session.setMode('ace/mode/golang');
        if ( !isLanguageSet ) {
            editor.setValue('package main \n import "fmt" \n func main() { \n //A Simple Hello World Program \n fmt.Println("hello, world") \n //Getting input via STDIN \n var userInput string \n fmt.Scanln(&userInput) \n fmt.Println("The Input Provided is: " + userInput) \n}');
            editor.clearSelection();
        }
    }
    else if (langName === 'CS') {
    	editor.session.setMode('ace/mode/csharp');
        if ( !isLanguageSet ) {
            editor.setValue('public class Hello { \n public static void Main() {  \n\n //A Simple Hello World Program \n System.Console.WriteLine("hello, world"); \n //Getting input via STDIN \n string userInput = System.Console.ReadLine(); \n System.Console.WriteLine("The Input Provided is: " + userInput); \n} \n}');
            editor.clearSelection();
        }
    }
    else if (langName === 'RUBY') {
    	editor.session.setMode('ace/mode/ruby');
        if ( !isLanguageSet ) {
            editor.setValue('#A Simple Hello World \n puts "hello, world" \n \n  #Getting input via STDIN \n userInput = gets \n puts "The Input Provided is: " + userInput');
            editor.clearSelection();
        }
    }
    else if (langName === 'RUST') {
    	editor.session.setMode('ace/mode/rust');
        if ( !isLanguageSet ) {
            editor.setValue('fn main() { \n //A Simple Hello World \n println!("hello, world"); \n //Getting input via STDIN \n let mut userInput = String::new(); \n std::io::stdin().read_line(&mut userInput).unwrap(); \n println!("The Input Provided is: {}", userInput); \n}');
            editor.clearSelection();
        }
    }
};

const idetifyLang = (code) => {
    const guessLang = new GuessLang();
    guessLang.runModel(code).then((result) => {
        let programmingLang = 'cpp';
        switch (result[0].languageId) {
            case 'bat':
                programmingLang = 'BASH';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'c':
                programmingLang = 'C';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'cpp':
                programmingLang = 'CPP14';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'clj':
                programmingLang = 'CLOJURE';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'go':
                programmingLang = 'GO';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'cs':
                programmingLang = 'CS';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'java':
                programmingLang = 'JAVA8';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'js':
                programmingLang = 'JAVASCRIPT';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'py':
                programmingLang = 'PY3';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'rb':
                programmingLang = 'RUBY';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            case 'rs':
                programmingLang = 'RUST';
                $('#mode').val(programmingLang).change();
                runCode(code, programmingLang);
                break;
            default:
                programmingLang = 'CPP14';
                $('#mode').val(programmingLang).change();
                $('#output').val('');
        }
    });
};

// Editor Settings
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);

chrome.storage.sync.get('code', function(code) {
    if (code.code && code.code !== null && code.code !== '') {
        isLanguageSet = true;
        $('#output').val('Compiling Your Code. Pls Wait...');
        idetifyLang(code.code);
        editor.setValue(code.code);
        editor.clearSelection();
    }
    else {
        editor.session.setMode("ace/mode/c_cpp");
        editor.setValue('#include <stdio.h>\n\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n');
        editor.clearSelection();
    }
});

$('#mode').on('change', function() {
    const modeValue = this.value;
    setLanguage(modeValue);
});

$('#compile').on('click', function() {
    $('#output').val('Compiling Your Code. Pls Wait...');
    $('#compile').prop('disabled', true);
    const code = editor.getValue();
    runCode(code);    
});
