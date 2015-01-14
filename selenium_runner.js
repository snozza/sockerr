var glob = require('glob');
var spawn = require('child_process').spawn;
var app = require('./app');
var mongoose = require('mongoose');
var env = require('./lib/config/test_env');
var webdriverio = require('../node_modules/webdriverio');

var dbUri = process.env.MONGOHQ_URL;
var client = {};

client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });

var server = app.listen(3000, function() {
  var port = 3000;
  process.env.URL = 'http://localhost:' + port;
  return glob('test/featuresSelenium', function(err, filename) {
    var child = spawn('mocha', ['test'].concat(filename));
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
          server.close(function() {
            console.log('server closed');
            return process.exit(code);
          });         
        });
      });      
    });
  });
});