beforeEach(function () {
  jasmine.addMatchers({
    toHaveNoOverflows: function () { //unless there is no space in the line
      return {
        compare: function (actual, expected) {
          var paragraphFitter = actual;
          var linesArray = paragraphFitter.splitParagraph.split("\n");
          var legal = true;
          for (i = 0; i < linesArray; i++) {
            if (i.length > desiredInchesWide) {
              for (j = 0; j < i.length; j++) {
                if (i[j] == " ") { 
                  legal = false; 
                }
              }
            }
          }
          return {
            pass: legal == true;
          }
        }
      };
    },
    toLeaveNoWordBehind: function () {
      return {
        compare: function (actual, expected) {
          var paragraphFitter = actual;
          var linesArray = paragraphFitter.splitParagraph.split("\n");
          var lastLine = linesArray[-1];
          var legal = false;
          if (lastLine.length > desiredInchesWide) {
            legal = true;
          }
          for (i = 0; i < lastLine; i++) {
            if (i[j] == " ") { 
              legal = true; 
            } 
          }
          return {
            pass: legal = true;
          }
        }
      }
    }
  });
});
