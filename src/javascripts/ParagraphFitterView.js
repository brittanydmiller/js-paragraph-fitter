function ParagraphFitterView(selectors) {
  this.paragraphSelector = selectors.paragraph;
  this.spanCharSelector = selectors.spanChar;
};

ParagraphFitterView.prototype = {
  printColumn: function(desiredInchesWide, fittedParagraph){
    console.log(fittedParagraph);
    document.getElementById(this.paragraphSelector).innerText = fittedParagraph;
  }, 
  reportMetrics: function(characterWidth, desiredInchesWide, overflows){
    var pixelsInAnInch = 96
    var parPxWidth = document.getElementById(this.paragraphSelector).offsetWidth;
    var charPxWidth = document.getElementById(this.spanCharSelector).offsetWidth;
    console.log("----------METRICS----------")
    console.log("Paragraph Pixel Width: " + parPxWidth);
    console.log("Character Pixel Width: " + charPxWidth);
    console.log("Desired Characters per Line: " + desiredInchesWide / characterWidth);
    //can't guarantee width if no line ever makes it to the longest length, due to needing to wrap.
    console.log("Actual number of characters per longest line): " + parPxWidth/charPxWidth);
    console.log("Desired Paragraph Width (in inches): " + desiredInchesWide);
    console.log("Actual Paragraph Width (in inches): " + parPxWidth/pixelsInAnInch);
    console.log("Overflows at character number(s): " + overflows);
  }
}


