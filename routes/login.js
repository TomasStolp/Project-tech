const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/user.js');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const session = require('express-session');
const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');

router.get('/', (req, res)=>{
  res.render('login.ejs', {title: 'Login'});
});


router.post('/', (req, res)=>{
    const loginUser = (req, res) => {
        return new Promise((resolve, reject) => {
    
            User.findOne({userName:req.body.username}, (err, user)=>{
                console.log(user)
                if(user){
                
                bcryptjs.compare(req.body.password, user.password, function(err, result) {
                    
                    if(result == true){
                        console.log('nice, logged in');
                        req.session.id = result._id;
                        req.session.userName = result.userName;
                        req.session.firstName = result.firstName;
                        const uniqueId = uuid();
                        console.log(uniqueId);
                        resolve();
                    }
                    else{
                       reject(new Error('Could not be authenticated'));
                    }
                        
                    
                });
            }
            });
        });
    }

    loginUser(req, res)
    .then(()=>{
        console.log('sending to my profile');
        res.status(200).render('my-profile.ejs', {test:'er', firstName:req.session.firstName});
    })
    .catch((err)=>{
      console.log(`Following error while attempting to login ${err.message}`);
     
        if(req.body.emailaddress){
            let enteredEmail = req.session.emailaddress;
            res.render('register.ejs', {
                enteredEmail:enteredEmail,
            }); 
        }
    })
});

module.exports = router;