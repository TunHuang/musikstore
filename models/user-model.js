const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  vorname: String,
  nachname: String,
  email: String,
  password: String,
  isAdmin: Boolean
});

module.exports = mongoose.model('user', userSchema);