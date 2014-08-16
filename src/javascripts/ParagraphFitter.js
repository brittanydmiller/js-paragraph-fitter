function ParagraphFitter(view) {
  this.view = view;
  this.characterWidth = 0.25;
  this.overflows = [];
  this.splitParagraph = "";
};

ParagraphFitter.prototype = {
  fitToWidth: function(desiredInchesWide, inputParagraph){
    this.insertBreaks(inputParagraph, desiredInchesWide); 
    //this.view.printColumn(desiredInchesWide, this.splitParagraph);
    //this.view.reportMetrics(this.characterWidth, desiredInchesWide, this.overflows);  
    //throw new Error("invalid number");
    //handle input errors  
  },
  insertBreaks: function(inputParagraph, desiredInchesWide){
    var charArray = inputParagraph.split("");
    var lineStartIndex = 0;
    var lineCharCount = desiredInchesWide / this.characterWidth;
    this.findNextLineEnd(charArray, lineCharCount, lineStartIndex);
    this.splitParagraph = charArray.join("");
  },
  findNextLineEnd:function(charArray, lineCharCount, lineStartIndex){
    var totalChars = charArray.length
    if (lineStartIndex + lineCharCount < totalChars){
      lineEndIndex = lineStartIndex + lineCharCount;
      this.crawlBackTilSpace(charArray, lineCharCount, lineEndIndex);
    }
  },
  crawlBackTilSpace: function(charArray, lineCharCount, lineEndIndex){
    if (charArray[lineEndIndex] === " ") {
      this.handleFoundSpace(charArray, lineCharCount, lineEndIndex);
    } else if(charArray[lineEndIndex] === "\n" || lineEndIndex === 0){
      this.overflows.push(lineEndIndex + lineCharCount);
      var backToEndIndex = lineEndIndex + lineCharCount
      this.crawlFwdTilSpace(charArray, lineCharCount, backToEndIndex);
    } else {
      this.crawlBackTilSpace(charArray, lineCharCount, lineEndIndex - 1);
    }
  },
  crawlFwdTilSpace: function(charArray, lineCharCount, lineEndIndex){
    var totalChars = charArray.length;
    var finalLine = lineEndIndex + lineCharCount > totalChars;
    if (finalLine) {
      return; //skips the trailing word check, but the word is already over 1 line long.
    } else if (charArray[lineEndIndex] === " "){
      this.replaceWithBreak(charArray, lineEndIndex);
      this.findNextLineEnd(charArray, lineCharCount, lineEndIndex + 1);
    } else {
      this.crawlFwdTilSpace(charArray, lineCharCount, lineEndIndex + 1);
    }
  },
  handleFoundSpace: function(charArray, lineCharCount, lineEndIndex){
    if (this.singleTrailingWord(charArray, lineCharCount, lineEndIndex)){
      this.crawlBackTilSpace(charArray, lineCharCount, lineEndIndex - 1);
    } else {
      this.replaceWithBreak(charArray, lineEndIndex);
      this.findNextLineEnd(charArray, lineCharCount, lineEndIndex + 1);
    }
  },
  singleTrailingWord: function(charArray, lineCharCount, lineEndIndex){
    var totalChars = charArray.length;
    var finalLine = lineEndIndex + lineCharCount > totalChars;
    var finalChars = charArray.slice(lineEndIndex + 1);
    var singleWord = function(finalChars){
      var finalWord = true;
      for (var i = 0; i < finalChars.length; i++){
        if (finalChars[i] == " ") { 
          finalWord = false; }
      }
      return finalWord
    }
    return finalLine && singleWord(finalChars);
  },
  replaceWithBreak: function(charArray, givenIndex){
    charArray[givenIndex] = "\n";
  }
}