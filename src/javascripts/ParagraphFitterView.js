function ParagraphFitterView(selectors) {
  this.outputSelector = selectors.output;
  this.spanCharSelector = selectors.spanChar;
  this.metricsSelector = selectors.metrics;
  this.hiddenSelector = selectors.hidable;
};

ParagraphFitterView.prototype = {
  outputResults: function(desiredPixelsWide, fittedParagraph, characterWidth, overflows){
    this.printColumn(desiredPixelsWide, fittedParagraph);
    this.toggleVisibility();
    this.reportMetrics(characterWidth, desiredPixelsWide, overflows);
  },
  printColumn: function(desiredPixelsWide, fittedParagraph){
    document.getElementById(this.outputSelector).innerText = fittedParagraph;
  }, 
  toggleVisibility: function() {
    var hiddens = document.getElementsByClassName(this.hiddenSelector);
    for (i = 0; i < hiddens.length; i++) {
      hiddens[i].style.display = 'block';
    }
  },
  reportMetrics: function(characterWidth, desiredPixelsWide, overflows) {
    var parPxWidth = document.getElementById(this.outputSelector).offsetWidth;
    var charPxWidth = document.getElementById(this.spanCharSelector).offsetWidth;
    var metricsOutput = "";

    var metricsData = {
      "Desired Characters per Line: ": desiredPixelsWide / characterWidth,
      "Actual number of characters per longest line: ": parPxWidth / charPxWidth,
      "Overflows at character number(s): ": overflows,
      "Desired Paragraph Width: ": desiredPixelsWide,
      "Actual Paragraph Width: ": parPxWidth,
      "...may be larger due to overflow-lines stretching the containing paragraph, ": "or smaller in the random case that no line escapes early cropping due to the fall of natural breaks."
    }
    for (i in metricsData) {
      metricsOutput += "<li>";
      metricsOutput += i;
      metricsOutput += metricsData[i];
      metricsOutput += "</li>";
    }
    document.getElementById(this.metricsSelector).innerHTML = metricsOutput;   
  }
}


