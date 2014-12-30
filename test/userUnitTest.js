var expect = require('chai').expect;
var User = require('../lib/models/User');

describe('#users', function() {

  it('should save user', function(done) {
    new User({username: "test", email: "test@test.com",
      full_name: "tester tesing", password: "test"}).save(function(err, createdUser) {
        expect(createdUser.username).to.eql('test');
        done();
    });
  });

});