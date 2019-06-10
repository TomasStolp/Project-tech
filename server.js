  /*jshint esversion: 6 */

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
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const session = require('express-session');

// Password hashing


const app = express();

const registerUser = require('./modules/register.js');
const loginUser = require('./modules/login.js');

// Models
const User = require('./models/user.js');
const Band = require('./models/band.js');


const url = process.env.MONGODB_URI;


mongoose.connect(url, {useNewUrlParser: true});
let db = mongoose.connection;

db.once("open", ()=>{
  console.log("DB connected successfully to server");
});

app
// .use(session({
//   genid: (req) => {
//     console.log('Inside the session middleware');
//     console.log(req.sessionID);
//     return uuid();
//   },
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))
// .get('/', (req, res) => {
//   console.log(req)
//   const uniqueId = uuid()
//   res.send(`Hit home page. Received the unique id: ${uniqueId}\n`)
// })
.use(express.static(__dirname + '/static'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))
.set('view-engine', 'ejs')
.set('views', 'views')
.get(':var(/|/home)?', home)
.get('/login', login)
.get('/register', registerPage)
.get('/my-profile', myProfile)
.get('/top-twenty', topTwenty)
.get('/add-bands', addBands)
.post('/register', register)
.post('/add-bands', addToUser)
.use(pageNotFound)
.listen(process.env.PORT, function(){
  console.log('Listening over 8000');
});

function pageNotFound(req, res){
  res.status(404).render('404.ejs')
}

function home(req, res){
  res.sendFile(__dirname + '/static/home.html');
}

function login(req, res){
  res.render('login.ejs');
}

function registerPage(req, res){
  res.render('register.ejs');
}

function register(req, res){
  registerUser(req, res)
  .then(() =>{
    res.redirect('/');
  })
  .catch((err)=>console.log(`Following error occured: ${err.message}`));
}

function myProfile(req, res){
  User.find(done);

  function done(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render('my-profile.ejs', {data: data});
    }
  }
}

function topTwenty(req, res) {
  /* I took this example out of the slides from the BE lecture.
  *  I tried to make it asynchronous before I realised it already is.
  */

  console.log('function top twenty running');
  User.find(done);

  function done(err, data) {
    if (err) {
      console.log(err);
    } else {
        console.log('Almost done with top twenty');
        res.render('top-twenty.ejs', {data: data});
    }
  }
}

function addBands(req, res){
  Band.find(done);

  function done(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render('add-bands.ejs', {data: data, error: null});
    }
  }
}

function addToUser(req, res){

  // For updating user data I used an example: https://www.pabbly.com/tutorials/node-js-mongodb-update-into-database/

  const pushToArray = new Promise( function (resolve, reject){

  let myquery = { firstName: "Tomas", $where: "this.top_20.length < 20" };
  let newvalues = {$addToSet: { top_20: { $each: Object.keys(req.body) } } };

  User.update(myquery, newvalues, function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
          resolve("Worked");
          console.log(Object.keys(req.body));
      }
    });
  });

  User.find(done);
  function done(err, data){
    if(err){
      console.log(err);
    }
    //https://stackoverflow.com/questions/42921727/how-to-check-req-body-empty-or-not-in-node-express
    else if(Object.keys(req.body).length === 0){
      console.log('send empty post');
      return;
    } else{
      pushToArray
      .then(function(resolved){
        console.log(resolved);
        res.redirect('/top-twenty');
      })
      .catch(function(error){
        console.log(error.message);
      });
    }
  }


}
