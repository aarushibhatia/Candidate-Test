const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);