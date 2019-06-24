/*
 *  On top of every JS document I put a comment which helps JSHint know that I'm working in ES6.
 *  Even though Nodejs doesn't support ES6 by default. I think I managed to compile ES5 to ES6 with the help of Babel.
 *  I used the following tutorial from the reference below to do that. I understand the basics of how he implemented it but,
 *  I don't understand what happens in hardcore detail.
 *  Reference: https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o
 */

/* Require dotenv file and trigger the config method.
 *  That will make the information in my .env file available in this file.
 *  The dot .env file is used to store information that shouldn't be publicly available like db info.
 */


/*
 * Mongo to communicate to my db.
 * Assert is included in Nodejs. It helps with testing and comparisons.
 * Http to communicate over the http protocol.
 * Express as middleware to easily create servers
 * Path is also included in
 * Ejs is my templating engine
 * Bodyparser is middleware to make it easier to parse input data
 * The app const starts a server.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
// Password hashing


const app = express();



// Models
const User = require('./models/user.js');
// const User = require('./models/user.js');
const Band = require('./models/band.js');

// Routes
const register = require('./routes/register.js');
const pageNotFound = require('./routes/404.js');
const addBands = require('./routes/add-bands.js');
const removeBand = require('./routes/delete-band.js');
const homeRoute = require('./routes/home.js');
const topTwenty = require('./routes/top-twenty.js');
const loginUser = require('./routes/login.js');
const logout = require('./routes/logout.js');

// const url = process.env.MONGODB_URI;
const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

mongoose.connect(url, {
  useNewUrlParser: true
});

let db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected successfully to server")
});

app
  .use(express.static(__dirname + '/static'))
  .use(session({
    name: 'Login Session',
    secret: 'Maniac',
    saveUninitialized: false,
    resave: false
  }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(expressValidator())

  .set('view-engine', 'ejs')
  .set('views', 'views')
  .get('/', homeRoute)
  .use('/login', loginUser)
  .use('/register', register)
  .use('/logout', logout)
  .use('/top-twenty/', removeBand)
  .use('/top-twenty', topTwenty)
  .use('/add-bands', addBands)
  .post('/add-bands', addBands)
  .use('*', pageNotFound)
  .listen(process.env.PORT, function () {
    console.log('Listening');
  });
