casper.test.begin('Posting Bites tests', 1, function(test) {
  casper.start('http://localhost:3000', function() {
    test.assertExists('form[id="new-post"]', 'new post form is found')
  });

  casper.run(function() {
    test.done();
  });
});