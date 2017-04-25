const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/api-router');
const middle = require('./middle/fnMiddle');
const mongoose = require('mongoose');
let app = express();

mongoose.connect('mongodb://localhost:27017/Leon');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(middle.tokenHandler());
app.use('/api', router);
app.use(middle.errorHandler());


module.exports = app;
