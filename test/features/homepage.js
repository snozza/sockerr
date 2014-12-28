casper.test.begin('assertSelectorHasText() tests', 2, function(test) {
    casper.start('http://localhost:3000', function() {
        test.assertSelectorHasText('title', 'Chitter');
    })

    casper.then(function() {
      test.assertSelectorHasText('h1', 'Chitter');
    });

    casper.run(function() {
      test.done();
    });
});