/** Externe Abhängigkeiten */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const corsMiddleware = require('./middleware/corsMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const mongoose = require('mongoose');

/** Routen */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const ordersRouter = require('./routes/orders');
const undefinedRouter = require('./routes/undefined');

/** Initialisierung */
const app = express();

// mongoose
const uri = process.env.MONGO ?? 'mongodb://localhost:27017/seededRecordshop';


mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

let db = mongoose.connection;

db.on('error', error => console.error(error));

db.once('open', () => console.log('Mit Datenbank verbunden'));

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
app.use('/orders', ordersRouter);

// nicht definierte Routen
app.use('*', undefinedRouter);

// Meine Fehler-Middleware
app.use(errorMiddleware);

/** Export */
module.exports = app;
