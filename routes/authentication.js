const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    if(!req.session.user){
        console.log('you still need to login')
        return res.render('login.ejs')
    }else{
        console.log('hey, you are still logged in')
        // res.redirect('/my-profile');
        next();
    }
    // next();
})

module.exports = router;