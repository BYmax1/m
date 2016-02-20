var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session')
var util = require('util'); 

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'keyboard cat',cookie: { maxAge: 300000 }}));//使用express-session中间件,将sessionId储存在cookie当中

app.use(flash());


app.use(function(req,res,next){
  //res.locals.user=req.session.user;

  var err = req.flash('error');
  var success = req.flash('success');

  res.locals.user = req.session.user;

  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;
  
  //console.log('console: '+util.inspect(res.locals.user));
  next();
});//动态助手的新版实现方式，用app.local

app.use('/', routes);//将路由中间件挂载至应用
app.use('/users', users);//将路由中间件挂载至应用



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
