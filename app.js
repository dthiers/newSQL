var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var newsql = require('newsql'); // DATABASE CONFIGURATION
var handlebars = require('express-handlebars');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  handlebars({ defaultLayout: 'main', extname: '.hbs'
}));
app.set('view engine', 'hbs');

// App uses
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

// Config (like database and so)
var config = require('./config/config');

// NEW SQL database config
var Database = require('./config/database');
var db = new Database(newsql, config.database);

// Routes
var routes = require('./routes/index');
var users = require('./routes/users')(db.repositories.user);

app.use('/', routes);
app.use('/users', users);
app.use('/test', function(req, res, next) {
  res.render('test', { message: "Test teste"})
})

// ErrHandling from a seperate file
require('./lib/modules/errorHandler')(app);


module.exports = app;
