var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var FileStreamRotator = require('file-stream-rotator');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: '&ilovexsh&',
    cookie: {maxAge: 60 * 60 * 24 },
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        ttl:  60 * 60 * 24
    })
}));



app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
    app.locals.pretty = true;
    app.use(logger('dev'));


} else {
    app.locals.pretty = false;

    //log config for morgan
    var logDirectory = __dirname + '/log';
    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    // create a rotating write stream
    var accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: logDirectory + '/access-%DATE%.log',
        frequency: 'daily',
        verbose: false
    });

    // setup the logger
    app.use(logger('combined', {stream: accessLogStream}))


}


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
