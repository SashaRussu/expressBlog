const mongoose = require('./db');

let messagesSchema = mongoose.Schema({
  categoryid: String,
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Messages', messagesSchema);