const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.delete('/', (req, res)=>{
    User.findOne({userName:req.session.user}).exec()
    .catch((err)=>{
        console.log(err);
    })
    .then((data)=>{
        console.log(data);
        console.log(data.top_20.indexOf(req.params.band))
    })
})

module.exports = router;