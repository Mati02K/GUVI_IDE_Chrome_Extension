'use strict';

// Get the Extension Status whenever the page is loaded
let extensionStatus = true;
chrome.runtime.onConnect.addListener(
  {callback: chrome.storage.sync.get('extensionStatus', function(status) {
    if (status && status.extensionStatus !== null) {
      extensionStatus = status.extensionStatus;
    }
  })}
)

$(document).ready(function() { 
  
  if(extensionStatus) {
    if($('#btn-bg').hasClass('active')){
      $('#power-text strong').text('ON').css('color', '#08BC63');
    }else{
      $('#btn-bg').toggleClass('active');
      $('#power-text strong').text('ON').css('color', '#08BC63');
    }
  }
  else {
    if($('#btn-bg').hasClass('active')){
      $('#btn-bg').toggleClass('active');
      $('#power-text strong').text('OFF').css('color', '#000');
    }else{
      $('#btn-bg').toggleClass('active');
      $('#power-text strong').text('OFF').css('color', '#000');
    }
  }

  $('#btn-bg').click(function(){
    if($('#btn-bg').hasClass('active')){
      $('#btn-bg').toggleClass('active');
      $('#power-text strong').text('OFF').css('color', '#000');
      chrome.storage.sync.set(
        {extensionStatus : false}
      );
      extensionStatus = false;
    }else{
      $('#btn-bg').toggleClass('active');
      $('#power-text strong').text('ON').css('color', '#08BC63');
      chrome.storage.sync.set(
        {extensionStatus : true}
      );
      extensionStatus = true;
    }

  });

  $('#openide').on('click', function() {
    const ideURL = 'http://localhost:8000/ide.html';
    const openIDE = {
        url : ideURL,
        type : 'popup',
        top : 5,
        left : 5,
        width : 750,
        height :750,
    };

    chrome.windows.create(openIDE);
  });
});
