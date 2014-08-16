describe("ParagraphFitter", function() {
  var selectors = {paragraph:"container", spanChar:"char-example"};
  var paragraphFitterView = new ParagraphFitterView(selectors);
  var paragraphFitter = new ParagraphFitter(paragraphFitterView);
  var widthInInches = 5;
  var testLineCharCount = 20;
  var testLineEndIndex = 0;
  var paragraphText = "In August 2013, Gunn posted on his Facebook page that Tyler Bates would be composing the film's score. Gunn stated that Bates would write some of the score first so that he can film to the music, as opposed to scoring to the film.[129] In February 2014, Gunn revealed that the film would incorporate songs from the 1970s and 1980s, such as 'Hooked on a Feeling', on a mixtape in Quill's Walkman, which acts as a way for him to stay connected to the Earth, home and family he lost.[130] In May 2014, Gunn added that using the songs from the 70s and 80s were 'cultural reference points', saying, 'It’s striking the balance throughout the whole movie, through something that is very unique, but also something that is easily accessible to people at the same time. The music and the Earth stuff is one of those touchstones that we have to remind us that, yeah, [Quill] is a real person from planet Earth who’s just like you and me. Except that he’s in this big outer space adventure.'[121]" 
  var parLongStart = "Thefilm'sscoreandsoundtrack,whichfeaturesthesongsfromQuill'smixtape,andadeluxeedition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack album in history consisting entirely of previously released songs to top the chart.[132]";
  var parLongEnd = "The film's score and soundtrack, which features the songs from Quill's mixtape, and a deluxe edition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack albuminhistoryconsistingentirelyofpreviouslyreleasedsongstotopthechart.[132]"
  var testCharArray = paragraphText.split("");

  it("is defined", function() {
    expect(paragraphFitter).toBeDefined();
  });

  it("calls 'handleExceptions' from 'fitToWidth'", function() { 
    spyOn(paragraphFitter, 'handleExceptions')
    paragraphFitter.fitToWidth(widthInInches, paragraphText)
    expect(paragraphFitter.handleExceptions).toHaveBeenCalled();
  });

  it("calls 'insertBreaks' from 'fitToWidth'", function() {
    spyOn(paragraphFitter, 'insertBreaks')
    paragraphFitter.fitToWidth(widthInInches, paragraphText)
    expect(paragraphFitter.insertBreaks).toHaveBeenCalled();
  });

  it("calls 'findNextLineEnd' when 'insertBreaks' is called", function() {
    spyOn(paragraphFitter, 'findNextLineEnd')
    paragraphFitter.fitToWidth(widthInInches, paragraphText)
    expect(paragraphFitter.findNextLineEnd).toHaveBeenCalled();
  });

  it("calls 'crawlBackTilSpace' from 'findNextLineEnd'", function() {
    spyOn(paragraphFitter, 'crawlBackTilSpace');
    paragraphFitter.findNextLineEnd(testCharArray, testLineCharCount, testLineEndIndex);
    expect(paragraphFitter.crawlBackTilSpace).toHaveBeenCalled;  
  });

  it("passes an index of 'testLineEndIndex + testLineCharCount' when it calls 'crawlBackTilSpace' from 'findNextLineEnd'", function() {
    spyOn(paragraphFitter, 'crawlBackTilSpace');
    paragraphFitter.findNextLineEnd(testCharArray, testLineCharCount, testLineEndIndex);
    expect(paragraphFitter.crawlBackTilSpace).toHaveBeenCalledWith(testCharArray, testLineCharCount, testLineEndIndex + testLineCharCount);  
  });

  describe("crawlFwdTilSpace function", function() {
    it("calls 'crawlFwdTilSpace' from 'crawlBackTilSpace'", function() {
      spyOn(paragraphFitter, 'crawlFwdTilSpace');
      paragraphFitter.crawlBackTilSpace(testCharArray, testLineCharCount, testLineEndIndex);
      expect(paragraphFitter.crawlFwdTilSpace).toHaveBeenCalled;  
    });

    it("passes an index of 'testLineEndIndex + testLineCharCount' when it calls 'crawlFwdTilSpace' from 'crawlBackTilSpace' w", function() {
      spyOn(paragraphFitter, 'crawlFwdTilSpace');
      paragraphFitter.crawlBackTilSpace(testCharArray, testLineCharCount, testLineEndIndex);
      expect(paragraphFitter.crawlFwdTilSpace).toHaveBeenCalledWith(testCharArray, testLineCharCount, testLineEndIndex + testLineCharCount);  
    });
  });

  describe("handleFoundSpace function", function() {
    it("calls 'handleFoundSpace' from 'crawlBackTilSpace'", function() {
      spyOn(paragraphFitter, 'handleFoundSpace');
      paragraphFitter.crawlBackTilSpace(testCharArray, testLineCharCount, testLineEndIndex);
      expect(paragraphFitter.handleFoundSpace).toHaveBeenCalled;  
    });

    it("calls 'breakAndKeepLooking' from 'handleFoundSpace'", function() {
      spyOn(paragraphFitter, 'breakAndKeepLooking');
      paragraphFitter.handleFoundSpace(testCharArray, testLineCharCount, testLineEndIndex);
      expect(paragraphFitter.breakAndKeepLooking).toHaveBeenCalled;  
    });

    it("calls 'singleTrailingWord' from 'handleFoundSpace'", function() {
      spyOn(paragraphFitter, 'singleTrailingWord');
      paragraphFitter.handleFoundSpace(testCharArray, testLineCharCount, testLineEndIndex);
      expect(paragraphFitter.singleTrailingWord).toHaveBeenCalled;  
    });
  
    it("calls 'replaceWithBreak' through 'handleFoundSpace'", function() {
      spyOn(paragraphFitter, 'replaceWithBreak');
      paragraphFitter.handleFoundSpace(testCharArray, testLineEndIndex);
      expect(paragraphFitter.replaceWithBreak).toHaveBeenCalled;  
    });
  }); 

  describe("singleWord function", function() {
    it("calls 'singleWord' from 'singleTrailingWord'", function() {
      spyOn(paragraphFitter, 'singleWord');
      paragraphFitter.singleTrailingWord(testCharArray, testLineCharCount, testLineEndIndex);
      expect(paragraphFitter.singleWord).toHaveBeenCalled;
    });

    it("returns true when 'singleWord' is passed an array with no spaces", function() {
      expect(paragraphFitter.singleWord(["b","o","y"])).toEqual(true);  
    });

    it("returns false when 'singleWord' is passed an array with spaces", function() {
      expect(paragraphFitter.singleWord(["b","o","y"," ","g","i","r","l"])).toEqual(false);  
    });
  });

  describe("if/else options in crawlBackTilSpace function", function() {
    var testCharArray = ["b","o","y"," ","g","i","r","l"," "]

    it("calls 'handleFoundSpace' from 'crawlBackTilSpace' if the passed-in array ends in a space", function(){
      spyOn(paragraphFitter, 'handleFoundSpace')
      paragraphFitter.crawlBackTilSpace(testCharArray, 8, 8)
      expect(paragraphFitter.handleFoundSpace).toHaveBeenCalled();
    });

    it("calls 'crawlFwdTilSpace' from 'crawlBackTilSpace' if the passed-in lineEndIndex is 0", function(){
      spyOn(paragraphFitter, 'crawlFwdTilSpace')
      paragraphFitter.crawlBackTilSpace(testCharArray, 8, 0)
      expect(paragraphFitter.crawlFwdTilSpace).toHaveBeenCalled();
    });

    it("calls 'crawlBackTilSpace' from 'crawlBackTilSpace' if the passed-in array ends in a letter", function(){
      spyOn(paragraphFitter, 'crawlBackTilSpace')
      paragraphFitter.crawlBackTilSpace(testCharArray.slice(0,7), 8, 0)
      expect(paragraphFitter.crawlBackTilSpace).toHaveBeenCalled();
    });
  });

  describe("if/else options in crawlFwdTilSpace function", function() {
    var testCharArray = ["b","o","y"," ","g","i","r","l"," ","b","o","y"," ","g","i","r","l"," "]

    it("calls 'replaceWithBreak' from 'crawlFwdTilSpace' if the passed-in array ends in a space", function(){
      spyOn(paragraphFitter, 'replaceWithBreak')
      paragraphFitter.crawlFwdTilSpace(testCharArray, 8, 8)
      expect(paragraphFitter.replaceWithBreak).toHaveBeenCalled();
    });

    it("calls 'crawlFwdTilSpace' from 'crawlFwdTilSpace' if the passed-in array ends in a letter", function(){
      spyOn(paragraphFitter, 'crawlFwdTilSpace')
      paragraphFitter.crawlFwdTilSpace(testCharArray.slice(0,7), 8, 8)
      expect(paragraphFitter.crawlFwdTilSpace).toHaveBeenCalled();
    });
  });
  
  describe("it should check data types of input and throw appropriate errors", function() {
    it("should throw an exception if given a non-positive-integer for paragraph-width when called", function(){
      expect(function() {
        paragraphFitter.fitToWidth("x", paragraphText)
      }).toThrowError("invalid number for paragraph width");
    });

    it("should throw an exception if given a non-string for paragraph text when called", function() {
      expect(function() {
        paragraphFitter.fitToWidth(widthInInches, 5)
      }).toThrowError("invalid paragraph string");
    });
  });

  describe ("Overall Output should have correct new linebreaks set (Not Unit Tests)", function() {
    it("should insert linebreaks", function() {
      paragraphFitter.fitToWidth(widthInInches, paragraphText);
      expect(paragraphFitter.splitParagraph).toContain("\n");
    });
  
    it("should insert linebreaks at the correct character counts", function() {
      var shortParText = "This paragraph, when split, should have the correct character count per line (for a normal input)";
      widthInInches = 5;
      expectedCharCount = widthInInches / .25;
      paragraphFitter.fitToWidth(widthInInches, shortParText);
      firstLine = paragraphFitter.splitParagraph.split("\n")[0];
      expect(firstLine.length).toEqual(expectedCharCount);
    });

    it("should insert linebreaks at the correct character counts with a 5-in paragraph", function() {
      widthInInches = 5;
      paragraphFitter.fitToWidth(widthInInches, paragraphText);
      expect(paragraphFitter.splitParagraph).toEqual("In August 2013, Gunn\nposted on his\nFacebook page that\nTyler Bates would be\ncomposing the film's\nscore. Gunn stated\nthat Bates would\nwrite some of the\nscore first so that\nhe can film to the\nmusic, as opposed to\nscoring to the\nfilm.[129] In\nFebruary 2014, Gunn\nrevealed that the\nfilm would\nincorporate songs\nfrom the 1970s and\n1980s, such as\n'Hooked on a\nFeeling', on a\nmixtape in Quill's\nWalkman, which acts\nas a way for him to\nstay connected to\nthe Earth, home and\nfamily he lost.[130]\nIn May 2014, Gunn\nadded that using the\nsongs from the 70s\nand 80s were\n'cultural reference\npoints', saying,\n'It’s striking the\nbalance throughout\nthe whole movie,\nthrough something\nthat is very unique,\nbut also something\nthat is easily\naccessible to people\nat the same time.\nThe music and the\nEarth stuff is one\nof those touchstones\nthat we have to\nremind us that,\nyeah, [Quill] is a\nreal person from\nplanet Earth who’s\njust like you and\nme. Except that he’s\nin this big outer\nspace adventure.'[121]");
    });

    it("should insert linebreaks at the correct character counts with a 7-in paragraph designed to naturally end with a single trailing word", function() {
      widthInInches = 7;
      var parSingleTrailingWord = "The film's score and soundtrack, which features the songs from Quill's mixtape, and a deluxe edition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack album in history consisting entirely of released songs to top the chart.";
      paragraphFitter.fitToWidth(widthInInches, parSingleTrailingWord);
      expect(paragraphFitter.splitParagraph).toEqual("The film's score and\nsoundtrack, which features\nthe songs from Quill's\nmixtape, and a deluxe\nedition featuring both\nalbums, was released by\nHollywood Records on July\n29, 2014.[131] By August\n2014, the soundtrack had\nreached the top of the\nBillboard 200 chart,\nbecoming the first\nsoundtrack album in history\nconsisting entirely of\nreleased songs to top\nthe chart."); 
    });
  });
  
  describe ("When a line is longer that the paragraph width", function() {
    it("should insert linebreaks at the correct character when first line overflows", function() {
      widthInInches = 10;
      paragraphFitter.fitToWidth(widthInInches, parLongStart);
      expect(paragraphFitter.splitParagraph).toEqual("Thefilm'sscoreandsoundtrack,whichfeaturesthesongsfromQuill'smixtape,andadeluxeedition\nfeaturing both albums, was released by\nHollywood Records on July 29, 2014.[131]\nBy August 2014, the soundtrack had\nreached the top of the Billboard 200\nchart, becoming the first soundtrack\nalbum in history consisting entirely of\npreviously released songs to top\nthe chart.[132]");
    });

    it("should insert linebreaks at the correct character when last line overflows", function() {
      widthInInches = 10;
      paragraphFitter.fitToWidth(widthInInches, parLongEnd);
      expect(paragraphFitter.splitParagraph).toEqual("The film's score and soundtrack, which\nfeatures the songs from Quill's mixtape,\nand a deluxe edition featuring both\nalbums, was released by Hollywood\nRecords on July 29, 2014.[131] By August\n2014, the soundtrack had reached the top\nof the Billboard 200 chart, becoming the\nfirst soundtrack\nalbuminhistoryconsistingentirelyofpreviouslyreleasedsongstotopthechart.[132]");
    });

    it("should record the character position at which the overflow occured", function() {
      widthInInches = 10;
      paragraphFitter.overflows = [];
      paragraphFitter.fitToWidth(widthInInches, parLongStart);
      expect(paragraphFitter.overflows).toEqual([40]);
    });
    
    it("should record the character position at which the overflow occured", function() {
      widthInInches = 10;
      paragraphFitter.overflows = [];
      paragraphFitter.fitToWidth(widthInInches, parLongEnd);
      expect(paragraphFitter.overflows).toEqual([329]);
    });    
  });

  describe ("Bigger picture tests for the overall program output", function() {
    it("output should have no lines over the paragraph-width unless they have no spaces", function() {
      widthInInches = 10;
      paragraphFitter.fitToWidth(widthInInches, parLongStart);
      expect(paragraphFitter.splitParagraph).toHaveNoOverflows;
    });
    
    it("output should have more than one word on the final line, unless it is over the paragraph width", function() {
      widthInInches = 10;
      paragraphFitter.fitToWidth(widthInInches, parLongStart);
      expect(paragraphFitter.splitParagraph).toLeaveNoWordBehind;
    });
  })


});
