/* global chrome */

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("frameless_window.html",
    {  frame: "none",
       id: "framelessWinID",
       innerBounds: {
         width: 360,
         height: 300,
         left: 600,
         minWidth: 220,
         minHeight: 220
      }
    }
  );
})
