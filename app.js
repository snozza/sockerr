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


