var expect = require('chai').expect;
var User = require('../lib/models/User');

describe('#users', function() {

  it('should save user', function(done) {
    new User({username: "rover", email: "rover@rover.com",
              full_name: "Tars", password: "noderover"}).save(done);
  });
});