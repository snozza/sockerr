var webdriverio = require('webdriverio');
var expect = require('chai').expect;
var User = require('../../lib/models/User');

describe('Main page tests', function(){

    this.timeout(99999999);
    var client = {};

    function login() {
      client
        .setValue('#email', 'test@test.com')
        .setValue('#password', 'test')
        .click('#login')
    }

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
          expect(err).to.not.be.true;
          expect(title).to.eql('Sockerr');
        })

       
        .call(done);
    });

    it('should be able to login', function(done) {
      client
        .url('http://localhost:3000')
        .element('.post-post', function(err, post) {
          expect(post).to.not.exist
        })
        .then(login())
        .waitForExist('.post-post', 1000, function(err, post) {
          expect(err).to.not.be.true
          expect(post).to.be.true;
        })
        .call(done);     
    });

    it('should be able to see a new post instantly', function(done) {
      client
        .url('http://localhost:3000')
        .waitForExist('#body', 1000)
        .setValue('#body', 'Hello, World!')
        .click('#submit')
        .waitForExist('.post-body', 1000)
        .getText('.post-body', function(err, val) {
          expect(val).to.contain('Hello, World!');
        })
        .call(done);
    });

    // it('should be able to delete a post', function(done) {
    //   client.
    //     url('http://localhost:3000')


    after(function(done) {
        client.end(done);
    });
});