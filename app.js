var   express = require('express');                // @use: the framework

var   path = require('path'),                     // @use: to serve static files
      favicon = require('serve-favicon'),         // @use: to avoid 'no-favicon' error
      logger = require('morgan'),                 // @use: console logger
      cookieParser = require('cookie-parser'),    // @use: used to parse cookies in the req.header
      bodyParser = require('body-parser'),

      newsql = require('newsql'),                 // @use: DATABASE CONFIGURATION
      handlebars = require('express-handlebars'), // @use: templating engine
      cors = require('cors'),

      config = require('./config/config')(),
      Database = require('./config/database');

console.log(config);
// Call inits
var   app = express(),                              // Start app
      db = new Database(newsql, config);            // Init database


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


  app.use(cors());

  // Allow serving of static files from ./public
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(require('./lib/modules/returnHandler'));


// Routes from a seperate module
require('./lib/modules/routeHandler')(app, db);

// ErrHandling from a seperate module
require('./lib/modules/errorHandler')(app);

module.exports = app;
