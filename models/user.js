const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const userSchema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    userName: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    top_20: Array
  });


  module.exports = mongoose.model('User', userSchema);
