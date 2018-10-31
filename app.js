const path = require('path');
const log4js = require('log4js');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rotues = require('./rotues');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  session({
    secret: 'secret',
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
  }),
);
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(rotues);

module.exports = app;
