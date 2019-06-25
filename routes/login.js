const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/user.js');
const bcryptjs = require('bcryptjs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        return res.render('my-profile.ejs', {
            firstName: req.session.firstName
        });
    }
    res.render('login.ejs', {
        title: 'Login',
        offline: true
    });
});


router.post('/', (req, res) => {

    User.findOne({
            userName: req.body.username
        }).exec()
        // console.log(user)
        .then((user) => {
            if (user) {

                bcryptjs.compare(req.body.password, user.password, (err, result) => {

                    if (result == true) {
                        console.log('nice, logged in');
                        req.session.user = user.userName;
                        req.session.firstName = user.firstName;
                        console.log(req.session.user)

                        console.log('sending to my profile');
                        return res.status(200).redirect('/my-profile');
                    } else {
                        console.log('rejected')
                        // reject(new Error('Could not be authenticated'));
                        return res.redirect('/login')
                    }


                })
            }
            // else{
            //     // reject(new Error("User can't be found   "));
            // }
        })
        // .catch((err)=>{
        //     console.log(err)
        // })

        // .then((result)=>{
        //     console.log(req.session.user)
        //     console.log('sending to my profile');
        //     res.send(req.session.user)

        //     // res.status(200).render('my-profile.ejs', {firstName:req.session.firstName});
        //     // return res.status(200).redirect('/my-profile');
        //     // console.log('send to profile')
        // })

        .catch((err) => {
            console.log(`Following error while attempting to login ${err.message}`);

            if (String(req.body.emailaddress).length !== 0) {
                let enteredEmail = req.session.emailaddress;
                res.render('register.ejs', {
                    enteredEmail: enteredEmail
                });
            } else {
                res.render('register.ejs');
            }
        })
});

module.exports = router;