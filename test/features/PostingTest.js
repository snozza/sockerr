casper.test.begin('Posting Bites tests', 3, function(test) {
  casper.start('http://localhost:3000', function() {
    test.assertExists('form[id="new-post"]', 'New post form is found');
    this.fill('form[id="new-post"]', {post: 'Hello, World'}, false); //false to avoid submitting   
  });

  casper.then(function() {
    test.assertTitle('Chitter', 'Main Title');
    test.assertTextExists('Hello, World', "Post was successful");
  });

  casper.run(function() {
    test.done();
  });
}); 