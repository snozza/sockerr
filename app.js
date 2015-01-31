var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./lib/models');
var Schema = mongoose.Schema;
var session = require('express-session');
var generateKey = require('./lib/scripts/keyGen');

var dbUri = process.env.MONGOHQ_URL || 'mongodb://localhost/chitter_development';
var db = mongoose.connect(dbUri);
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  if(!models.Post || !models.User) return next('No models');
  req.models = models;
  return next();
});
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(session({secret: generateKey()}));
app.use(function(req, res, next) {
  res.locals.login = req.session.user;
  next();
});

require('./lib/routes')(app);
require('./lib/scripts/sockets')(server);

app.use(function(req, res, next) {
  var err = new Error('not found');
  err.status = 404;
  next(err);
});

if(app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = server;

if(!module.parent) {
  var env = require('./lib/config/dev_env');
  server.listen(port, function() {
    console.log('listening on ' + port);
  })
};