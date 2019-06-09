const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    top_20: Array
  });


  const User = module.exports = mongoose.model('User', userSchema);