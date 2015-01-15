var webdriverio = require('webdriverio');
var expect = require('chai').expect;
var User = require('../../lib/models/User');
var helper = require('../helpers/application');

describe('Main page tests', function(){

  this.timeout(9999999);
  var client = {};

  before(function(done) {
    new User({username: "test", email: "test@test.com",
              full_name: "tester tesing", password: "test"}).save(function() {
      client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
      client.init(done);
    });
  });

  after(function(done) {
      client.end(done);
  });

  it('Sockerr',function(done) {
    client
      .url('http://localhost:3000')
      .getTitle(function(err, title) {
        expect(err).to.not.be.true;
        expect(title).to.eql('Sockerr');
      }) 
      .call(done);
  });

  it('should be able to see a new post instantly', function(done) {
    client
      .url('http://localhost:3000')
      .then(helper.login(client))
      .waitForExist('.post-post', 1000) 
      .waitForVisible('#body', 1000)
      .setValue('#body', 'Hello, World!')
      .click('#submit')
      .waitForExist('.post-body', 1000)
      .getText('.post-body', function(err, val) {
        expect(val).to.contain('Hello, World!');
      })
      .call(done);
  });

  it('should be able to delete a post', function(done) {
    client.
      url('http://localhost:3000')
      .getAttribute('.delete', 'data-id', function(err, data) {
        console.log(data);
      })
      .click('.delete')
      .waitForExist('.delete', 2000, true)
      .isExisting('.delete', function(err, val) {
        expect(val).to.be.false
      })
      .call(done);

  });
});