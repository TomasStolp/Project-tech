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

require('dotenv').config();

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
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const http = require('http');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.connect(url, function(err, client) {
  assert.equal(null, err, 'Heey it didn\' work!');
  console.log("DB connected successfully to server");
  db = client.db(process.env.DB_NAME);
});

app
.use(express.static(__dirname + '/static'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))
.set('view-engine', 'ejs')
.set('views', 'views')
.get(':var(/|/home)?', home)
.get('/my-profile', myProfile)
.get('/top-twenty', topTwenty)
.get('/add-bands', addBands)
.post('/add-bands', addToUser)
.get('*', (req, res)=>{
  res.render('404.ejs');
})
.listen(8000, function(){
  console.log('Listening over 8000');
});

function home(req, res){
    res.sendFile(__dirname + '/static/home.html');
}

function myProfile(req, res, next){
  db.collection('users').find().toArray(done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('my-profile.ejs', {data: data});
    }
  }
}

function topTwenty(req, res, next) {
  /* I took this example out of the slides from the BE lecture.
  *  I tried to make it asynchronous before I realised it already is.
  */

  console.log('function top twenty running');
  db.collection('users').find().toArray(done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      console.log('Almost done with top twenty');
      res.render('top-twenty.ejs', {data: data});
    }
  }
}

function addBands(req, res, next){
  db.collection('bands').find().toArray(done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('add-bands.ejs', {data: data});
    }
  }
}

function addToUser(req, res, next){

  // For updating user data I used an example: https://www.pabbly.com/tutorials/node-js-mongodb-update-into-database/

  db.collection('users').find().toArray(done);
  function done(err, data){
    if(err){
      next(err);
    }
    //https://stackoverflow.com/questions/42921727/how-to-check-req-body-empty-or-not-in-node-express
    else if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        return;
    }
    else{
      pushToArray.then(function(resolved){
        console.log(resolved);
        res.redirect('/top-twenty');
      })
      .catch(function(error){
        console.log(error.message);
      });
    }
  }

  let pushToArray = new Promise( function (resolve, reject){

  // let parsedBands = JSON.parse(req.body);
  let myquery = { firstName: "Tomas", $where: "this.top_20.length < 20" };
  let newvalues = {$addToSet: {
    top_20: Object.keys(req.body).toString()
  }};

  db.collection("users").update(myquery, newvalues, function(err, data) {
      if (err) {
        next(err);
        reject(err);
      } else {
          resolve("Worked");
          console.log(Object.keys(req.body));
      }
    });
});

}



//
// function addArtist(req, res){
//   data.push({
//     name: req.body.title.toString();
//   });
//   res.render('objects.ejs', {
//     data: data,
//     title: ''
//   });
// }
//
//
// function onabout(req, res){
//   res.render('test.ejs', {
//     data: data
//   });
// }
//
// function home(req, res){
//   res.render('home.ejs', {
//     data: data
//   });
// }
//
// function profile(req, res){
//   res.render('profile.ejs', {
//     data: data,
//     title: "My Profile"
//   });
// }
