var glob = require('glob');
var spawn = require('child_process').spawn;
var app = require('./app');
var mongoose = require('mongoose');
var env = require('./lib/config/test_env');

var dbUri = process.env.MONGOHQ_URL;
var port = process.env.PORT || 3000;

if(mongoose.connection.db) { 
  mongoose.disconnect(function() {
    mongoose.connect(dbUri, function() {
      console.log('connected to db: ' + dbUri);
    });
  })
}
else {
  mongoose.connect(dbUri, function() {
    console.log('connected to db: ' + dbUri);
  });
};

var server = app.listen(port, function() {  
  process.env.URL = 'http://localhost:' + port;
  return glob('test', function(err, filename) {
    var child = spawn('mocha', ['--recursive'].concat(filename));
    var selenium = spawn("java", ['-jar', 'selenium-server-standalone-2.44.0.jar']);
    child.stdout.on('data', function(msg) {
      return process.stdout.write(msg);
    });
    child.stderr.on('data', function(msg) {
      return process.stderr.write(msg);
    });
    return child.on('exit', function(code) {
      mongoose.connection.db.dropDatabase(function() {
        mongoose.disconnect(function() {
          console.log('disconnected from db: ' + dbUri);
            return process.exit(code);    
        });
      });      
    });
  });
});
