describe("ParagraphFitterView", function() {
  var selectors = {paragraph:"container", spanChar:"char-example"};
  var paragraphFitterView = new ParagraphFitterView(selectors);
  var paragraphFitter = new ParagraphFitter(paragraphFitterView);
  
  it("is defined", function() {
    expect(paragraphFitterView).toBeDefined();
  });
});