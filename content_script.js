// The code in this file will load:
//   * after the document is ready
//   * after any previous content scripts (e.g., jquery.js)
//
// So you can safely use jQuery (the `$`) in the code below
var enabled = false;
var reloadOnce = false;

var toggle = function(){
  if(enabled){
    $('#p5Inspector').remove();
    var canvas = document.getElementById('defaultCanvas0');
    if (canvas) {
      console.log('replacing canvas');
      canvas.parentNode.removeChild(canvas);
    }
    if(!reloadOnce){
      reload = true;
      location.reload();
    }
  } 
  else {
    var s = document.createElement('script');
    s.id = "p5Inspector";
    s.type = "text/javascript";
    s.src = chrome.extension.getURL('p5.inspector.js');
    var head = document.getElementsByTagName('head')[0];
    head.insertBefore(s, head.childNodes[0]);
    console.log("injected p5inspector");
  }
  enabled = !enabled;
};

chrome.extension.onMessage.addListener(function(msg){
  if(msg.action === 'toggle'){
    toggle();
  }
});