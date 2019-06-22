const mongoose = require('mongoose');
// const Band = require('../band.js');
const Schema = mongoose.Schema;

const bandSchema = new Schema({
  name: String
});

  const userSchema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    userName: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    top_20: [bandSchema]
  });


  module.exports = mongoose.model('User', userSchema);
