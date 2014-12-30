var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./lib/models');
var Schema = mongoose.Schema;

var dbUri = process.env.MONGOHQ_URL || 'mongodb://localhost/chitter_development';
var db = mongoose.connect(dbUri);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  if(!models.Post || !models.User) return next('No models');
  req.models = models;
  return next();
});
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

require('./lib/routes.js')(app);

module.exports = app;
if(!module.parent) {
  app.listen(3000, function() {
    console.log('listening on 3000');
  })
};