const mongoose = require('mongoose');

const Lost_itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  uri: { type: String },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Lost_item', Lost_itemSchema);
