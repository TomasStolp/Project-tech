const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Band = require('../models/band.js');

router.get('/', (req, res) => {
  Band.find(done);
  function done(err, data) {
    if (err) {
       console.log(err);
    } else {
      res.render('add-bands.ejs', {data: data, pageType:"add-bands", error: null});
    }
  }
});



router.post('/', (req, res) => {

        // For updating user data I used an example: https://www.pabbly.com/tutorials/node-js-mongodb-update-into-database/

        const pushToArray = new Promise( function (resolve, reject){

        let myquery = { userName: 'stolptomas@hotmail.com', $where: "this.top_20.length < 20" };
        let newvalues = {$addToSet: { top_20: { $each: Object.keys(req.body) } } };

        User.update(myquery, newvalues, function(err, data) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
                console.log(req.session.userName)
                resolve("Worked");
                console.log(Object.keys(req.body));
            }
          });
        });

        User.find(done);
        function done(err, data){
          if(err){
            console.log(err);
          }
          //https://stackoverflow.com/questions/42921727/how-to-check-req-body-empty-or-not-in-node-express
          else if(Object.keys(req.body).length === 0){
            console.log('send empty post');
            return;
          } else{
            pushToArray
            .then(function(resolved){
              console.log(resolved);
              res.redirect('/top-twenty');
            })
            .catch(function(error){
              console.log(error.message);
            });
          }
        }
      });

module.exports = router;
