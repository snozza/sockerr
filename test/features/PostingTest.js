casper.options.clientScripts = ['/Users/asnead/documents/projects/chitter/public/js/jquery.js'];

casper.test.begin('Posting Bites tests', 3, function(test) {
  casper.start('http://localhost:3000', function() {
    test.assertTitle('Chitter', 'Main Title');
    test.assertExists('form[action="/posts"]', 'New post form is found');
  });

  
  casper.run(function() {
    test.done();
  });
}); 