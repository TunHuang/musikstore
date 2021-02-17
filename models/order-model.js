const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  produktId: String,
  anzahl: Number
});

module.exports = mongoose.model('order', orderSchema);