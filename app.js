var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./lib/models');
var Schema = mongoose.Schema;
var session = require('express-session');

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
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(session({secret: "this is super secret"}));
app.use(function(req, res, next) {
  res.locals.login = req.session.user;
  next();
});

require('./lib/routes.js')(app);

io.on('connection', function(socket) {
  console.log('A new client connected: ' + socket.id);
  
  socket.on('new-post', function(data) {
    io.sockets.emit('new-post', data);
  });

  socket.on('delete-post', function(_id) {
    io.sockets.emit('delete-post', _id);
  });
});

module.exports = server;
if(!module.parent) {
  server.listen(3000, function() {
    console.log('listening on 3000');
  })
};