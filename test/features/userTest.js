var webdriverio = require('webdriverio');
var expect = require('chai').expect;
var User = require('../../lib/models/User');
var helper = require('../helpers/application');

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
      .waitForVisible('#new-email', 2000, function(err, field) {
       client.saveScreenshot('hello.png')
      })
      .setValue('#new-email', 'andrew@andrew.com')
      .setValue('#new-username', 'snozza')
      .setValue('#new-name', 'Andrew Snead')
      .setValue('#new-password', 'snozsnoz')
      .click('#new-user')
      .waitForExist('.post-post', 2000, function(err, post) {
        expect(post).to.exist
      })
      .call(done);
  });

  it('should be able to logout', function(done) {
    this.timeout(9999999)
    client
      .url('http://localhost:3000')
      .click('#logout')
      .waitForExist('.post-post', 2000, true, function(err, val) {
        expect(val).to.be.true
      })
      .call(done)
  })

  it('should be able to login', function(done) {
    client
      .url('http://localhost:3000')
      .element('.post-post', function(err, post) {
        expect(post).to.not.exist
      })
      .then(helper.login(client))
      .waitForExist('.post-post', 1000, function(err, post) {
        expect(err).to.not.be.true
        expect(post).to.be.true;
      })
      .call(done);     
  });
});