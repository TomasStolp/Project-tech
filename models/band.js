const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const bandSchema = new Schema({
    name: String
  });


  const Band = module.exports = mongoose.model('Band', bandSchema);