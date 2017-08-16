const mongoose = require('./db');

let categoriesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Categories', categoriesSchema);