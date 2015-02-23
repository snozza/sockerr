var mongoose = require('mongoose');
var dbUri = process.env.MONGOHQ_URL || 'mongod://localhost/chitter_test'

module.exports = 

afterEach(function(done) {
  mongoose.connection.db.dropDatabase(function() {
    done();
  })
});



