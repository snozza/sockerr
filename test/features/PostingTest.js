casper.test.begin('Posting Bites tests', 3, function(test) {
  casper.start('http://localhost:3000', function() {
    test.assertExists('form[id="new-post"]', 'New post form is found');
    this.fill('form[id="new-post"]', {post: 'Hello, World'}, false); //false to avoid submitting 
    this.click('#submit');  
  });

casper.then(function() {
  this.waitForSelector('.post-body')
//   var body_html;
// this.waitForSelectorTextChange('div.content', function() {
//    body_html = this.evaluate(function() {
//        return document.body.innerHTML;
//    });
// });
});

  casper.then(function() {
    this.capture('foo.jpg', undefined, {
        format: 'jpg',
        quality: 75
    });
    test.assertTitle('Chitter', 'Main Title');
    test.assertExists('.post-body');
  });

  casper.run(function() {
    test.done();
  });
}); 