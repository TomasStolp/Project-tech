const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    /* I took this example out of the slides from the BE lecture.
    *  I tried to make it asynchronous before I realised it already is.
    */
  
    console.log('function top twenty running');
    User.find(done);
  
    function done(err, data) {
      if (err) {
        console.log(err);
      } else {
          console.log('Almost done with top twenty');
          res.render('top-twenty.ejs', {data: data});
      }
    }
  });

module.exports = router;

