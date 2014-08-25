//This entire file must be commented out if you wish to run Jasmine tests in the browser
//Below are 4 versions of paragraphText that can be easily switched between to view wrapping in the browser.

window.onload = function() {
  var s = skrollr.init();
}

function showAbout() {
  if (event.preventDefault) { event.preventDefault(); }
  var aboutDiv = document.getElementById("description");
  console.log(aboutDiv.style.display)
  if (aboutDiv.style.display == "block") {
    aboutDiv.style.display = "none";
  } else {
    aboutDiv.style.display = "block";
  }
  return false;
}

function captureForm() {
  if (event.preventDefault) { event.preventDefault(); }
  var widthInPixels = parseInt(event.target[0].value);
  var paragraphText = event.target[1].value;
  var selectors = { output:"output", spanChar:"char-example", metrics:"metrics", hideable:"hideable", userInput: "user-input" };
  var paragraphFitterView = new ParagraphFitterView(selectors);
  var paragraphFitter = new ParagraphFitter(paragraphFitterView);
  paragraphFitter.fitToWidth(widthInPixels, paragraphText);
  return false;
}
