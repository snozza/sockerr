var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Schema = mongoose.Schema;

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index')
});

module.exports = app;
if(!module.parent) {
  app.listen(3000, function() {
    console.log('listening on 3000');
  })
};