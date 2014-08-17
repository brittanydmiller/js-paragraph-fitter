##js-paragraph-fitter
====

A paragraph fitter in JavaScript that can make your paragraph any width with custom line breaks! Very exciting. With special consideration for making sure your last line always has more than one word in it, and logging any possible overflows caused by really long words or really short paragraph-widths.


- input: single string of paragraph text, given width of inches for resulting paragraph
- output: string w/ line breaks


###hmm...font-widths and inches
-------
First off, I wondered how I would set the width of a monospaced font to 1/4 inch per letter? 

I knew CSS has inch units. But it just maps to 96 "CSS pixels" which may or may not be an actual inch or an actual screen pixel. 

Setting {font-size: .25in;} actually just sets highest and lowest possible points on the Y-axis -- NOT the width. So, I needed a way to measure the width of the characters and the width of the lines they produce.

Reaching an actual measuring-stick inch values may be beyond my ability, but I'm guessing also beyond the true scope of the challenge. Probably the more important part is that a character's width is one-quarter of the given paragraph width... i.e. take the given paragraph width, mutiply by four, and there's your characters-per-line value.

###testing considerations
------
I knew that for general visual checking I could render it in the console, and then style the console output with %c + CSS if I needed to ensure that it's a monospace font. (Turns out to be unnecessary as DevTools already uses monospace fonts for console output).

I thought I could possibly test the overall function with Jasmine, which I would use anyway for unit testing. I had no idea *how* I would do that at the time though.

I had some large conflicts with Jasmine. A conflict with window.onload makes the Jasmine test output page go blank if I do not comment out my own driver code. The Jasmine test output page also thinks my DOM manipulation is intended for IT, rather than the index.html output page the code was written for. I was not able to solve this issue, so when running jasmine tests I have to comment out the DOM-ish bits of my code and the entire init.js file. If you know of any tricks for handling this, I would love to hear them! I was thinking maybe running Jasmine in the console would work, but have not investigated it too far at this time.

A Jasmine win was that learned how to write custom matchers to do some big picture checks on the program. I wrote a custom matcher in the SpecHelper file to make sure that the paragraph won't have a lonely single word on the last line (unless the word itself is wider than the paragraph). I wrote another to test for making sure that no single line is longer than the paragraph width (unless there are no spaces in the line).


###display it to the DOM for fun? 
-------
I thought this might be an interesting way to try for some measurement validation...
Render the paragraph to the browser, with the containing paragraph element's display property set to inline-block, and margin/padding set to 0. That way the container will fit itself to the contents.

Set an example span on the page, filled with only a single character. 

I originally tried to measure these widths in DevTools, but could not get an accurate read on the width of span element (it was just saying "auto" or giving a rounded number when I hovered).

A stackoverflow suggested getting the offsetWidths of the span and the paragraph as the true widths of the elements I was seeking. The offsetWidth method seems much more accurate. As a bonus, once I made the font-size: 40.3 px, all the calculations flowed perfectly with CSS inches! 

###instructions for viewing in the DOM/Console
------
(it is also online at [brittanydmiller.com/FGS/src](brittanydmiller.com/FGS/src) but you won't be able to mess with the inputs)

1. Make sure init.js is NOT commented (by default this is taken care of).
2. Make sure lines 17 & 18 in ParagraphFitter.js are NOT commented (by default this is taken care of).
3. Open src/index.html in your browser
4. View your beautiful paragraph
5. Open the console to see metrics about your paragraph
6. Adjust the input (desired paragraph widths, different paragraph text) in the init.js file.
7. Refresh the browser to see your new output

###instructions for viewing Jasmine test ouput
-------
1. Comment out init.js
2. Comment out lines 17 & 18 in ParagraphFitter.js
3. Have Jasmine installed, and your jasmine server running
4. Go to localhost:8888 to view test output




