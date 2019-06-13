const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/user.js');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const loginUser = (req, res)=>{
    return new Promise((resolve, reject) => {

        User.findOne({userName:req.body.username}, (err, result)=>{
            
            bcryptjs.compare(req.body.password, result.password, function(err, res) {
                if(res == true){
                    console.log('nice, logged in');
                }
            });
            
        });
  
        // bcryptjs.compare(req.body.password, hash, function(err, res) {
        //     res
        // });
            // if(req.password){
                
            // }else{
            //     reject('Error occured');
            // }
        });
    }

  const login = module.exports = loginUser;