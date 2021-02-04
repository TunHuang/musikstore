const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  vorname: String,
  nachname: String,
  email: String,
  password: String
});

module.exports = mongoose.model('user', userSchema);