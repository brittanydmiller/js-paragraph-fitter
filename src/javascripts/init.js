//This entire file must be commented out if you wish to run Jasmine tests in the browser
//Below are 4 versions of paragraphText that can be easily switched between to view wrapping in the browser.

window.onload = function(){
  var selectors = {paragraph:"container", spanChar:"char-example"};
  var paragraphFitterView = new ParagraphFitterView(selectors);
  var paragraphFitter = new ParagraphFitter(paragraphFitterView);
  var widthInInches = 7;

  // // Long line to start:
  var paragraphText = "Thefilm'sscoreandsoundtrack,whichfeaturesthesongsfromQuill'smixtape,andadeluxeedition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack album in history consisting entirely of previously released songs to top the chart.[132]";
  
  // // When width = 7 this one will show the "leave no single word behind" feature.
  // var paragraphText = "The film's score and soundtrack, which features the songs from Quill's mixtape, and a deluxe edition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack album in history consisting entirely of released songs to top the chart.";
  
  // // Long line at end:
  // var paragraphText = "The film's score and soundtrack, which features the songs from Quill's mixtape, and a deluxe edition featuring both albums, was released by Hollywood Records on July 29, 2014.[131] By August 2014, the soundtrack had reached the top of the Billboard 200 chart, becoming the first soundtrack album in historyconsistingentirelyofpreviouslyreleasedsongstotopthechart.";
  
  // // When width = 3 this one shows that not-overflowing trumps "leave no single word behind."
  // var paragraphText = "In August 2013, Gunn posted on his Facebook page that Tyler Bates would be composing the film's score. Gunn stated that Bates would write some of the score first so that he can film to the music, as opposed to scoring to the film.[129] In February 2014, Gunn revealed that the film would incorporate songs from the 1970s and 1980s, such as 'Hooked on a Feeling', on a mixtape in Quill's Walkman, which acts as a way for him to stay connected to the Earth, home and family he lost.[130] In May 2014, Gunn added that using the songs from the 70s and 80s were 'cultural reference points', saying, 'It’s striking the balance throughout the whole movie, through something that is very unique, but also something that is easily accessible to people at the same time. The music and the Earth stuff is one of those touchstones that we have to remind us that, yeah, [Quill] is a real person from planet Earth who’s just like you and me. Except that he’s in this big outer space adventure.'";
  
  paragraphFitter.fitToWidth(widthInInches, paragraphText);
}
