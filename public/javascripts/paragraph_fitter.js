function ParagraphFitter(view) {
  this.view = view
  this.characterWidth = 0.25;
  this.overflows = [];
};

ParagraphFitter.prototype = {
  fitToWidth: function(desiredInchesWide, inputParagraph){
    this.insertBreaks(inputParagraph, desiredInchesWide); 
    this.view.printColumn(desiredInchesWide, this.splitParagraph);
    this.view.reportMetrics(this.characterWidth, desiredInchesWide, this.overflows);  
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
    else {
      this.findBreakingSpace(charArray, lineCharCount, lineEndIndex - 1)
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

window.onload = function(){
  var selectors = {paragraph:"container", spanChar:"char-example"};
  var paragraphFitterView = new ParagraphFitterView(selectors);
  var paragraphFitter = new ParagraphFitter(paragraphFitterView);
  var widthInInches = 10;
  var paragraphText = "The film's score and soundtrack, which features the songs from Quill's mixtape, and a deluxe edition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack album in history consisting entirely of previously released songs to top the chart.[132]";
  //var paragraphText = "In August 2013, Gunn posted on his Facebook page that Tyler Bates would be composing the film's score. Gunn stated that Bates would write some of the score first so that he can film to the music, as opposed to scoring to the film.[129] In February 2014, Gunn revealed that the film would incorporate songs from the 1970s and 1980s, such as 'Hooked on a Feeling', on a mixtape in Quill's Walkman, which acts as a way for him to stay connected to the Earth, home and family he lost.[130] In May 2014, Gunn added that using the songs from the 70s and 80s were 'cultural reference points', saying, 'It’s striking the balance throughout the whole movie, through something that is very unique, but also something that is easily accessible to people at the same time. The music and the Earth stuff is one of those touchstones that we have to remind us that, yeah, [Quill] is a real person from planet Earth who’s just like you and me. Except that he’s in this big outer space adventure.'[121]";
  paragraphFitter.fitToWidth(widthInInches, paragraphText);
}