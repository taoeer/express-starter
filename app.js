const path = require('path');
const log4js = require('log4js');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rotues = require('./rotues');

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: 'secret',
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
  }),
);

app.set('query parser', false);

app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(rotues);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));



module.exports = app;
