const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.delete('/:band', (req, res)=>{
    let band = req.params.band;
    // User.findOne({userName:req.session.user}).exec()
    // .catch((err)=>{
    //     console.log(err);
    // })
    // .then((data)=>{
    //     console.log(data);
    //     console.log(data.top_20.indexOf(req.params.band))
    //     console.log(band)
        
    // })

    User.updateOne({userName:req.session.user}, {$pull:{top_20: {_id:band}}}).exec()
    .catch((err)=>{
        console.log(err);
    })
    .then((data)=>{
        console.log(data);
        console.log(data.top_20.indexOf(req.params.band))
        console.log(band)
        
    })
    // .then((res)=>{
    //     res.json({status: 'ok'})
    // })\

    res.json({status: 'ok'})

    // res.redirect('/top-twenty');
})

module.exports = router;