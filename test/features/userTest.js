var webdriverio = require('webdriverio');
var expect = require('chai').expect;
var User = require('../../lib/models/User');

describe ('User', function() {

  var client = {}

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'}});
    client.init(done);
  });

  after(function(done) {
    client.end(done);
  });

  it('should be able to sign up a new account', function(done) {
    this.timeout(999999)
    client
      .url('http://localhost:3000')
      .click('#signupbutton')
      .waitForVisible('#new-email', 1000, function(err, field) {
       client.saveScreenshot('hello.png')
      })
      .setValue('#new-email', 'andrew@andrew.com')
      .setValue('#new-username', 'snozza')
      .setValue('#new-name', 'Andrew Snead')
      .setValue('#new-password', 'snozsnoz')
      .click('#new-user')
      .waitForExist('.post-post', 1000, function(err, post) {
        client.saveScreenshot('hello1.png')
        expect(post).to.exist
      })
      .call(done);
  });
});