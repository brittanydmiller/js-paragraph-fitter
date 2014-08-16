describe("ParagraphFitterView", function() {
  var selectors = {paragraph:"container", spanChar:"char-example"};
  var paragraphFitterView = new ParagraphFitterView(selectors);
  var paragraphFitter = new ParagraphFitter(paragraphFitterView);

  it("is defined", function() {
    expect(paragraphFitterView).toBeDefined();
  });

  // I can't test if View methods get called because jasmine thinks I am looking for DOM elements
  // on its test results page rather than the index.html output page the code was written for. 
  // Have not been able to solve this issue.

});