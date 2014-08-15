function ParagraphFitter(view) {
  this.view = view
  this.characterWidth = .25;
};

ParagraphFitter.prototype = {
  split: function(desiredInchesWide, inputParagraph){
    this.determineLineCharCount(desiredInchesWide);
    this.insertBreaks(inputParagraph); 
  },
  determineLineCharCount: function(desiredInchesWide){
    this.lineCharCount = desiredInchesWide / this.characterWidth;
  },
  insertBreaks: function(inputParagraph){
    var charArray = inputParagraph.split("");
    var currentIndex = 0;
    var lineEndIndex = currentIndex + this.lineCharCount - 1;
    //iterate throught the entire charArray  
    //findNaturalBreaks
    //detectSpacesBackThroughTheLine
    //replaceWithBreak
    //reset curretnIndex & lineEndIndex
    this.splitParagraph = charArray.join("");
    console.log(this.splitParagraph)
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
  //paragraphFitter.split(5, "In August 2013, Gunn posted on his Facebook page that Tyler Bates would be composing the film's score. Gunn stated that Bates would write some of the score first so that he can film to the music, as opposed to scoring to the film.[129] In February 2014, Gunn revealed that the film would incorporate songs from the 1970s and 1980s, such as 'Hooked on a Feeling', on a mixtape in Quill's Walkman, which acts as a way for him to stay connected to the Earth, home and family he lost.[130] In May 2014, Gunn added that using the songs from the 70s and 80s were 'cultural reference points', saying, 'It’s striking the balance throughout the whole movie, through something that is very unique, but also something that is easily accessible to people at the same time. The music and the Earth stuff is one of those touchstones that we have to remind us that, yeah, [Quill] is a real person from planet Earth who’s just like you and me. Except that he’s in this big outer space adventure.'[121]")
  paragraphFitter.split(10, "The film's score and soundtrack, which features the songs from Quill's mixtape, and a deluxe edition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack album in history consisting entirely of previously released songs to top the chart.[132]")
}