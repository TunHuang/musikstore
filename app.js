/** Externe Abhängigkeiten */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/** Routen */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

/** Initialisierung */
const app = express();

/** Protokollierung */
app.use(logger('dev'));

/** Anfrage (Request) Parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** Statisch ausgelieferte Dateien */
app.use(express.static(path.join(__dirname, 'public')));

/** Routen */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/** Export */
module.exports = app;
