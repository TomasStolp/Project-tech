const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.js');

router.get('/', (req, res) => {
    const userCount = User.find({}, (err, result) => {

    }).exec()

    userCount.then((result) => {
        res.render('home.ejs', {
            usercount: result.length
        });
    });
    userCount.catch((err) => {
        console.log('Followin error: ' + err);
    });
});

module.exports = router;