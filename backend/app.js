require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const auth = require('./middleware/authenticate');

const sessionRouter = require('./routes/sessions');
const usersRouter = require('./routes/users');
const workoutsRouter = require('./routes/workouts');
const exercisesRouter = require('./routes/exercises');
const setsRouter = require('./routes/sets');
const exercisesRouterForAdmin = require('./routes/exercises_admin');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIESECRET));
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use('/sessions', sessionRouter);

app.use('/exercises', exercisesRouterForAdmin);

// app.use(auth);
app.use('/users', usersRouter);
app.use('/users/:userId/workouts', workoutsRouter);
app.use('/users/:userId/workouts/:workoutId/exercises', exercisesRouter);
app.use('/users/:userId/workouts/:workoutId/exercises/:exerciseId/sets', setsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
