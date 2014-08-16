function ParagraphFitter(view) {
  this.view = view;
  this.characterWidth = 0.25;
  this.overflows = [];
  this.splitParagraph = "";
};

ParagraphFitter.prototype = {
  fitToWidth: function(desiredInchesWide, inputParagraph) {
    var desiredInchesWide = desiredInchesWide;
    this.handleExceptions(desiredInchesWide, inputParagraph);
    this.insertBreaks(inputParagraph, desiredInchesWide); 

    //the following two view function calls must be disabled if you wish to run Jasmine tests in the browser.
    //(see ParagraphFitterView.js for more details)

    this.view.printColumn(desiredInchesWide, this.splitParagraph);
    this.view.reportMetrics(this.characterWidth, desiredInchesWide, this.overflows);   
  },
  handleExceptions: function(desiredInchesWide, inputParagraph) {
    if ( typeof(desiredInchesWide) !== "number") {
      throw new Error("invalid number for paragraph width");
    } else if ( typeof(inputParagraph) !== "string") {
      throw new Error("invalid paragraph string");
    }
  },
  insertBreaks: function(inputParagraph, desiredInchesWide) {
    var charArray = inputParagraph.split("");
    var lineStartIndex = 0;
    var lineCharCount = desiredInchesWide / this.characterWidth;
    this.findNextLineEnd(charArray, lineCharCount, lineStartIndex);
    this.splitParagraph = charArray.join("");
  },
  findNextLineEnd:function(charArray, lineCharCount, lineStartIndex) {
    var totalChars = charArray.length
    if (lineStartIndex + lineCharCount < totalChars) {
      lineEndIndex = lineStartIndex + lineCharCount;
      this.crawlBackTilSpace(charArray, lineCharCount, lineEndIndex);
    }
  },
  crawlBackTilSpace: function(charArray, lineCharCount, lineEndIndex) {
    if (charArray[lineEndIndex] === " ") {
      this.handleFoundSpace(charArray, lineCharCount, lineEndIndex);
    } else if(charArray[lineEndIndex] === "\n" || lineEndIndex === 0) {
      this.overflows.push(lineEndIndex + lineCharCount);
      var backToEndIndex = lineEndIndex + lineCharCount
      this.crawlFwdTilSpace(charArray, lineCharCount, backToEndIndex);
    } else {
      this.crawlBackTilSpace(charArray, lineCharCount, lineEndIndex - 1);
    }
  },
  crawlFwdTilSpace: function(charArray, lineCharCount, lineEndIndex) {
    var totalChars = charArray.length;
    var finalLine = lineEndIndex + lineCharCount > totalChars;
    if (finalLine) {
      return;    
    } else if (charArray[lineEndIndex] === " ") {
      this.breakAndKeepLooking(charArray, lineCharCount, lineEndIndex);
    } else {
      this.crawlFwdTilSpace(charArray, lineCharCount, lineEndIndex + 1);
    }
  },
  breakAndKeepLooking: function(charArray, lineCharCount, lineEndIndex){
    this.replaceWithBreak(charArray, lineEndIndex);
    this.findNextLineEnd(charArray, lineCharCount, lineEndIndex + 1);
  },
  handleFoundSpace: function(charArray, lineCharCount, lineEndIndex) {
    if (this.singleTrailingWord(charArray, lineCharCount, lineEndIndex)) {
      this.crawlBackTilSpace(charArray, lineCharCount, lineEndIndex - 1);
    } else {
      this.breakAndKeepLooking(charArray, lineCharCount, lineEndIndex);
    }
  },
  singleTrailingWord: function(charArray, lineCharCount, lineEndIndex) {
    var totalChars = charArray.length;
    var finalLine = lineEndIndex + lineCharCount > totalChars;
    var finalChars = charArray.slice(lineEndIndex + 1);
    return finalLine && this.singleWord(finalChars);
  },
  singleWord: function(arrayOfWords) {
    var onlyOneWord = true;
    for (var i = 0; i < arrayOfWords.length; i++) {
      if (arrayOfWords[i] == " ") { 
        onlyOneWord = false; }
    }
    return onlyOneWord;
  },
  replaceWithBreak: function(charArray, givenIndex) {
    charArray[givenIndex] = "\n";
  }
}