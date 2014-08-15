function ParagraphFitter(view) {
  this.view = view
  this.characterWidth = .25;
};

ParagraphFitter.prototype = {
  fitToWidth: function(desiredInchesWide, inputParagraph){
    this.insertBreaks(inputParagraph, desiredInchesWide); 
    this.view.printColumn(desiredInchesWide, this.splitParagraph);
    this.view.reportMetrics(this.characterWidth);  
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
      lineEndIndex = lineStartIndex + lineCharCount - 1
      this.findBreakingSpace(charArray, lineCharCount, lineEndIndex);
    }
  },
  findBreakingSpace: function(charArray, lineCharCount, lineEndIndex){
    if (charArray[lineEndIndex] === " ") {
      if ( this.singleTrailingWord(charArray, lineCharCount, lineEndIndex) ){
        this.findNextLineEnd(charArray, lineCharCount, lineEndIndex + 1);
      } else {
      this.replaceWithBreak(charArray, lineEndIndex);
      this.findNextLineEnd(charArray, lineCharCount, lineEndIndex + 1);
      }
    } else if (charArray[lineEndIndex] === "\n"){
      //what if the whole line has no spaces and we step back to an old \n?
      //do something else like splice in a hyphen
    }
    else {
      this.findBreakingSpace(charArray, lineCharCount, lineEndIndex - 1)
    }
  },
  replaceWithBreak: function(charArray, givenIndex){
    charArray[givenIndex] = "\n";
  }
}

function ParagraphFitterView() {
  this.paragraphSelector = "container";
  this.spanCharSelector = "char-example";
  this.inchesSelector = "inches";
};

ParagraphFitterView.prototype = {
  printColumn: function(desiredInchesWide, fittedParagraph){
    console.log(fittedParagraph);
    document.getElementById(this.inchesSelector).innerText = desiredInchesWide;
    document.getElementById(this.paragraphSelector).innerText = fittedParagraph;
  }, 
  reportMetrics: function(){
    var pixelsInAnInch = 96
    var parPxWidth = document.getElementById(this.paragraphSelector).offsetWidth;
    var charPxWidth = document.getElementById(this.spanCharSelector).offsetWidth;
    console.log("--------------------")
    console.log("Paragraph Pixel Width: " + parPxWidth);
    console.log("Character Pixel Width: " + charPxWidth);
    console.log(charPxWidth + " * 4 = " + parPxWidth);
    console.log("--------------------")
    console.log("Paragraph width in inches: " + parPxWidth / pixelsInAnInch);
    console.log("Character width in inches: " + charPxWidth / pixelsInAnInch);
    console.log(charPxWidth / pixelsInAnInch + " * 4 = " + parPxWidth / pixelsInAnInch);
  }
}

window.onload = function(){
  var paragraphFitterView = new ParagraphFitterView();
  var paragraphFitter = new ParagraphFitter(paragraphFitterView);
  var widthInInches = 10;
  var paragraphText = "The film's score and soundtrack, which features the songs from Quill's mixtape, and a deluxe edition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack album in history consisting entirely of previously released songs to top the chart.[132]";
  //var paragraphText = "In August 2013, Gunn posted on his Facebook page that Tyler Bates would be composing the film's score. Gunn stated that Bates would write some of the score first so that he can film to the music, as opposed to scoring to the film.[129] In February 2014, Gunn revealed that the film would incorporate songs from the 1970s and 1980s, such as 'Hooked on a Feeling', on a mixtape in Quill's Walkman, which acts as a way for him to stay connected to the Earth, home and family he lost.[130] In May 2014, Gunn added that using the songs from the 70s and 80s were 'cultural reference points', saying, 'It’s striking the balance throughout the whole movie, through something that is very unique, but also something that is easily accessible to people at the same time. The music and the Earth stuff is one of those touchstones that we have to remind us that, yeah, [Quill] is a real person from planet Earth who’s just like you and me. Except that he’s in this big outer space adventure.'[121]";
  paragraphFitter.fitToWidth(widthInInches, paragraphText);
}