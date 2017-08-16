const mongoose = require('./db');

let usersSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  salt: String,
  hash: String
});

module.exports =  mongoose.model('Users', usersSchema);