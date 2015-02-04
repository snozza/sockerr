var User = require('../../lib/models/User');

module.exports = {

  login: function(client) {
    client
      .setValue('#email', 'test@test.com')
      .setValue('#password', 'test')
      .click('#login');
  },
  newUser: function(done) {
    new User({username: "test", email: "test@test.com",
              full_name: "tester tesing", password: "test"}).save(done);
  }

};