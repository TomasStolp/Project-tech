const express = require('express');
const router = express.Router();

router.get('/', function pageNotFound(req, res){
    console.log('at least got here')
    res.status(404).render('404.ejs')
})

module.exports = router;