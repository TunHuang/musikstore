const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordSchema = new Schema({
  interpret: String,
  album: String,
  jahr: Number
});

module.exports = mongoose.model('record', recordSchema);