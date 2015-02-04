var webdriverio = require('webdriverio');
var expect = require('chai').expect;
var User = require('../../lib/models/User');
var helper = require('../helpers/application');
var dbCleaner = require('../helpers/dbCleaner');

describe('Main page tests', function(){

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
    client.init(done);
  });

  beforeEach(function(done) {
    helper.newUser(done)
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

  it('should be able to delete a post', function(done) {
    this.timeout(999999);
    client
      .url('http://localhost:3000')
      .waitForVisible('#email', 2000)
      .then(helper.login(client))
      .waitForExist('#body', 5000)
      .setValue('#body', 'Hello, World!')
      .click('#submit')
      .waitForExist('.post-body', 3000)
      .click('.delete')      
      .waitForExist('.delete', 2000, true)
      .isExisting('.delete', function(err, val) {
        expect(val).to.be.false
      })
      .call(done);
  });

  it('should be able to see a new post instantly', function(done) {
    this.timeout(999999);
    client
      .click('#logout')
      .waitForVisible('#email', 5000)
      .then(helper.login(client))
      .waitForExist('#body', 5000)
      .setValue('#body', 'Hello, World!')
      .click('#submit')
      .waitForExist('.post-body', 5000)
      .getText('.post-body', function(err, val) {
        expect(val).to.contain('Hello, World!');
      })
      .call(done);
  });  
});