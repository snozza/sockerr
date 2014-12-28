var glob = require('glob');
var spawn = require('child_process').spawn;
var app = require('./app');
var mongoose = require('mongoose');

dbUri = 'mongodb://localhost/chitter_test';

mongoose.connect(dbUri, function() {
  console.log('connected to db: ' + dbUri);
});

var server = app.listen(3000, function() {
  var port = 3000
  process.env.URL = 'http://localhost:' + port;
  return glob('test/*', function(err, filename) {
    var child = spawn('casperjs', ['test'].concat(filename));
    child.stdout.on('data', function(msg) {
      return process.stdout.write(msg);
    });
    child.stderr.on('data', function(msg) {
      return process.stderr.write(msg);
    });
    return child.on('exit', function(code) {
      mongoose.disconnect();
      server.close();
      return process.exit(code);
    });
  });
});
