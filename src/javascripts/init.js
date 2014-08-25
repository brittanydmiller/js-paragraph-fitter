//This entire file must be commented out if you wish to run Jasmine tests in the browser
//Below are 4 versions of paragraphText that can be easily switched between to view wrapping in the browser.

window.onload = function(){
  var s = skrollr.init();
}
  
function captureForm(){
  if (event.preventDefault) {event.preventDefault();}
  var widthInPixels = parseInt(event.target[0].value);
  var paragraphText = event.target[1].value;
  var selectors = {output:"output", spanChar:"char-example", metrics:"metrics", hidable:"hidable"};
  var paragraphFitterView = new ParagraphFitterView(selectors);
  var paragraphFitter = new ParagraphFitter(paragraphFitterView);
  paragraphFitter.fitToWidth(widthInPixels, paragraphText);
  return false;
}
