casper.options.clientScripts = ['/Users/asnead/documents/projects/chitter/public/js/jquery.js'];

casper.test.begin('Posting Bites tests', 3, function(test) {
  casper.start('http://localhost:3000', function() {
    test.assertTitle('Chitter', 'Main Title');
    test.assertExists('form[action="/posts"]', 'New post form is found');
  });

  casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
  });

  casper.then(function() {
    var newPost = casper.evaluate(function(body) {
      document.querySelector('#body').value = body;
      $('#submit').click();
      var post = $('body').find('.post-body').is(':visible');;
      return post;
    }, 'Hello, World');
    test.assert(newPost);
  });
  
  casper.run(function() {
    test.done();
  });
}); 