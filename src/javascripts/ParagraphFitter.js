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
    //(see ParagraphFitterViewSpec.js or the readme for more details)

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
    this.wordArray = inputParagraph.split(" ");
    var lineStartIndex = 0;
    this.lineCharCount = desiredInchesWide / this.characterWidth;
    this.findNextLineEnd(lineStartIndex);
    this.splitParagraph = this.wordArray.join(" ");
  },
  findNextLineEnd:function(lineStartIndex) {
    var runningLineLength = this.wordArray[lineStartIndex].length;
    var currentIndex = lineStartIndex;
    while (this.beforeParEnd(currentIndex) && this.hypotheticallyBelowLineLimit(runningLineLength, currentIndex)) {   
      console.log("allowed in: " + currentIndex)
      runningLineLength = this.addOneWord(runningLineLength, currentIndex);
      currentIndex++;
    } 
    this.handleFoundSpace(currentIndex)
  },
  beforeParEnd: function(currentIndex) {
    return currentIndex < this.wordArray.length - 1;
  },
  hypotheticallyBelowLineLimit: function(runningLineLength, currentIndex) {
    return this.addOneWord(runningLineLength, currentIndex) <= this.lineCharCount;
  },
  addOneWord: function(runningLineLength, currentIndex){
    if (this.wordArray[currentIndex + 1] == null) {
    console.log(this.wordArray + "|" + runningLineLength + "|" + currentIndex + "|" + this.wordArray[currentIndex] + "|" + this.wordArray.length);
    } else {
      return runningLineLength + 1 + this.wordArray[currentIndex + 1].length;
    } 
  },
  // crawlBackTilSpace: function(this.wordArray, lineCharCount, lineEndIndex) {
  //   if (this.wordArray[lineEndIndex] === " ") {
  //     this.handleFoundSpace(this.wordArray, lineCharCount, lineEndIndex);
  //   } else if(this.wordArray[lineEndIndex] === "\n" || lineEndIndex === 0) {
  //     this.overflows.push(lineEndIndex + lineCharCount);
  //     var backToEndIndex = lineEndIndex + lineCharCount
  //     this.crawlFwdTilSpace(this.wordArray, lineCharCount, backToEndIndex);
  //   } else {
  //     this.crawlBackTilSpace(this.wordArray, lineCharCount, lineEndIndex - 1);
  //   }
  // },
  // crawlFwdTilSpace: function(this.wordArray, lineCharCount, lineEndIndex) {
  //   var totalChars = this.wordArray.length;
  //   var finalLine = lineEndIndex + lineCharCount > totalChars;
  //   if (finalLine) {
  //     return;    
  //   } else if (this.wordArray[lineEndIndex] === " ") {
  //     this.breakAndKeepLooking(this.wordArray, lineCharCount, lineEndIndex);
  //   } else {
  //     this.crawlFwdTilSpace(this.wordArray, lineCharCount, lineEndIndex + 1);
  //   }
  // },
  breakAndKeepLooking: function(lineEndIndex){
    this.replaceWithBreak(lineEndIndex);
    this.findNextLineEnd(lineEndIndex + 1);
  },
  handleFoundSpace: function(currentIndex) {
    if (this.singleTrailingWord(currentIndex)) {   
      //this.breakAndKeepLooking(currentIndex - 1);
    } else {
      this.breakAndKeepLooking(currentIndex);
    }
  },
  singleTrailingWord: function(currentIndex) {
    return (this.wordArray[currentIndex + 1] == null);
    //not enough here
  },
  replaceWithBreak: function(givenIndex) {
    this.wordArray[givenIndex] = this.wordArray[givenIndex] + "\n";
  }
}
