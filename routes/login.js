const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/user.js');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const session = require('express-session');
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('login.ejs', {title: 'Login'});
});

router.post('/', (req, res)=>{
    const loginUser = (req, res) => {
        return new Promise((resolve, reject) => {
    
            User.findOne({userName:req.body.username}, (err, result)=>{
                
                bcryptjs.compare(req.body.password, result.password, function(err, res) {
                    if(res == true){
                        console.log('nice, logged in');
                    }
                });
                
            });
        });
    }

  loginUser(req, res)
  .then(()=>{
    console.log('sending to my profile');
    res.redirect('/my-profile')
  })
  .catch((err)=>console.log(`Following error while attempting to login ${err.message}`))
});

module.exports = router;