const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Band = require('../models/band.js');

router.get('/', (req, res, next) => {
  // if (!req.session.user) {
  //   res.redirect('/login');
  // }
  Band.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('add-bands.ejs', {
        data: data,
        pageType: "add-bands",
        error: null
      });
    }
  });

});

router.post('/', (req, res) => {

  // For updating user data I used an example: https://www.pabbly.com/tutorials/node-js-mongodb-update-into-database/

  // const pushToArray = new Promise(function (resolve, reject) {
  //   console.log(req.session.user)

  // Need to find alternative for limiting the size of the bands array
  // if (Object.keys(req.body).length === 0) {

    Band.find({
        name: {
          $in: Object.keys(req.body)
        }
      }).exec()

      .then((result) => {
        console.log(result)
        let newvalues = {
          $addToSet: {
            top_20: {
              $each: result
            }
          }
        };

        let myquery = {
          userName: req.session.user
        };

        User.updateOne(myquery, newvalues, (err, data)=> {
          if (err) {
            console.log(err);
          } else {
            console.log(req.session.userName)
            console.log(Object.keys(req.body));
          }
        })
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      })
      .finally(() => {
        res.redirect('/top-twenty');
      })
  // }
})





// })

// let newvalues = {$addToSet: { top_20: { $each: Object.keys(req.body) } } };




//   User.find(done);

//   function done(err, data) {
//     if (err) {
//       console.log(err);
//     }
//     // https://stackoverflow.com/questions/42921727/how-to-check-req-body-empty-or-not-in-node-express
//     else if (Object.keys(req.body).length === 0) {
//       console.log('send empty post');
//       return;
//     } else {
//       pushToArray
//         .then(function (resolved) {
//           console.log(resolved);
//           res.redirect('/top-twenty');
//         })
//         .catch(function (error) {
//           console.log(error.message);
//         });
//     }
//   }
// });

module.exports = router;