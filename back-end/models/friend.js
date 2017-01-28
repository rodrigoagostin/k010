const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  email:  { type: String,  unique: true, lowercase: true, required: true },
  name:   { type: String,   required: true },
  friend: { type: String, required: false }
});

const ModelClass = mongoose.model('Friend', friendSchema);
module.exports = ModelClass;
