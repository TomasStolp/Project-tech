/*jshint esversion: 6 */
const http = require('http');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

const data = [
  {
    name:'Tomas',
    age: 23
  },
  {
    name:'Marcella',
    age: 50
  }
];

app
.use(express.static('static'))
.use(bodyParser.urlencoded({extended: true}))
.set('view-engine', 'ejs')
.set('views', 'views')
.get(':var(/|/home)?', home)
.get('/about', onabout)
.get('/profile', profile)
.post('/', addArtist)
.get('*', (req, res)=>{
  res.render('404.ejs');
})
.listen(8000, function(){
  console.log('Listening over 8000');
});

function addArtist(req, res){
  data.push({
    name: req.body.title
  });
  res.render('objects.ejs', {
    data: data,
    title: ''
  });
}


function onabout(req, res){
  res.render('test.ejs', {
    data: data
  });
}

function home(req, res){
  res.render('home.ejs', {
    data: data
  });
}

function profile(req, res){
  res.render('profile.ejs', {
    data: data,
    title: "My Profile"
  });
}
