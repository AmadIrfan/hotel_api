var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerUser = require('./routes/registerUser');
var app = express();


//my routes

var mongoDb = require('./db/db');
var addEmployees = require('./routes/addEmployee')
var addRooms = require('./routes/addRooms')
var showUser = require('./routes/showUsers')
var room = require('./routes/rooms')
var getEmployee = require('./routes/getEmployee')

var getAdmin = require('./routes/getAdmin')
var getUser = require('./routes/getUser')
var login = require('./routes/login')
var bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registerUser', registerUser)
app.use('/getUser', getUser)
app.use('/showUser', showUser)
app.use('/getAdmin', getAdmin)
app.use('/addEmployees', addEmployees)
app.use('/getEmployees', getEmployee)
// app.use('/getServant', getServants)
app.use('/room', room)
app.use('/login', login)






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});







// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
