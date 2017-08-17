const mongoose = require('./db');

let messagesSchema = mongoose.Schema({
  categoryid: String,
  text: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    expires: 60*60*24
  }
});

module.exports = mongoose.model('Messages', messagesSchema);