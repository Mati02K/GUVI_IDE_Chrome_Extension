
const API_PATH = "https://guvi-api.codingpuppet.com/guvi2.0/model";

const apiPath = "extensionIDE.php";


$(document).on('click', '#submit', () => {
    const programmingLang = $('#lang').val();
    let cid = '';
    switch (programmingLang) {
        case 'c':
          cid = 'C';
          break;
        case "c++":
          cid = 'CPP14';
          break;
        case "java":
          cid = 'JAVA';
          break;
        case "js":
          cid = 'JAVASCRIPT';
          break;
        default:
          cid = 'PY3';
    }
    const code = $('#code').val();
    const guessLang = new GuessLang();
    guessLang.runModel(code).then((result) => {
      console.log(result);
    });
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
        alert(JSON.stringify(response));
      });
});