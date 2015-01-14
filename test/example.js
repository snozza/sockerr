var webdriverio = require('webdriverio');
var expect = require('chai').expect;
var User = require('../lib/models/User');

describe('Main page tests', function(){



    this.timeout(99999999);
    var client = {};
    var waitFor;

    before(function(done){
      new User({username: "test", email: "test@test.com",
                full_name: "tester tesing", password: "test"}).save(function() {
        client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
        client.init(done);
      });
    });

    it('Sockerr',function(done) {
      client
        .url('http://localhost:3000')
        .getTitle(function(err, title) {
          console.log(title);
          expect(err).to.eql(undefined);
          expect(title).to.eql('Sockerr');
        })
        .element('.post-post', function(err, post) {
          expect(post).to.not.exist
        })
       
        .call(done);
    });

    it('should be able to login', function(done) {
      client
        .url('http://localhost:3000')
        .setValue('#email', 'test@test.com')
        .setValue('#password', 'test')
        .click('#login')
        .waitForExist('.post-post', 1000, function(err, post) {
          expect(post).to.be.true;
        })
        .call(done);     
    })


    after(function(done) {
        client.end(done);
    });
});