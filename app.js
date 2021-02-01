/** Externe Abhängigkeiten */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const corsMiddleware = require('./middleware/corsMiddleware');

/** Routen */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');

/** Initialisierung */
const app = express();

/** Protokollierung */
app.use(logger('dev'));

/** Anfrage (Request) Parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Meine eigene Middleware zum Erlauben von CORS
app.use(corsMiddleware);

/** Statisch ausgelieferte Dateien */
app.use(express.static(path.join(__dirname, 'public')));

/** Routen */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);

/** Export */
module.exports = app;
