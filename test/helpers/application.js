module.exports = {

  login: function(client) {
    client
      .setValue('#email', 'test@test.com')
      .setValue('#password', 'test')
      .click('#login');
  }

};