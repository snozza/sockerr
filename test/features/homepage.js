casper.test.begin('assertSelectorHasText() tests', 1, function(test) {
    casper.start('http://localhost:3000', function() {
        test.assertSelectorHasText('title', 'Chitter');
    }).run(function() {
        test.done();
    });
});