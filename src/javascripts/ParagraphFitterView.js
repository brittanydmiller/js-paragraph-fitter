function ParagraphFitterView(selectors) {
  this.paragraphSelector = selectors.paragraph;
  this.spanCharSelector = selectors.spanChar;
};

ParagraphFitterView.prototype = {
  outputResults: function(desiredPixelsWide, fittedParagraph, characterWidth, overflows){
    this.printColumn(desiredPixelsWide, fittedParagraph);
    this.reportMetrics(characterWidth, desiredPixelsWide, overflows);
    this.toggleVisibility();
  },
  printColumn: function(desiredPixelsWide, fittedParagraph){
    document.getElementById(this.outputSelector).innerText = fittedParagraph;
  }, 
  reportMetrics: function(characterWidth, desiredInchesWide, overflows){
    var pixelsInAnInch = 96
    var parPxWidth = document.getElementById(this.paragraphSelector).offsetWidth;
    var charPxWidth = document.getElementById(this.spanCharSelector).offsetWidth;
    console.log("----------METRICS----------")
    console.log("Paragraph Pixel Width: " + parPxWidth);
    console.log("Character Pixel Width: " + charPxWidth);
    console.log("Desired Characters per Line: " + desiredInchesWide / characterWidth);
    console.log("Actual number of characters per longest line): " + parPxWidth/charPxWidth);
    console.log("Overflows at character number(s): " + overflows);
    console.log("Desired Paragraph Width (in inches): " + desiredInchesWide);
    console.log("Actual <p> Width (in inches): " + parPxWidth/pixelsInAnInch);
    console.log("...may be larger due to overflow-lines stretching the containing paragraph\nor smaller in the random case that no line escapes early cropping.")
  }
}


