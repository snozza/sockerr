var webdriverio = require('../node_modules/webdriverio'),
    expect      = require('chai').expect;

describe('my webdriverio tests', function(){

    this.timeout(99999999);
    var client = {};

    before(function(done){
            client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
            client.init(done);
    });

    it('Bitter',function(done) {
        client
            .url('http://localhost:3000')
            .getTitle(function(err, title) {
                expect(err).to.eql(undefined);
                expect(title).to.eql('Bitter');
            })
            .call(done);
    });

    after(function(done) {
        client.end(done);
    });
});