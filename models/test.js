const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
  score1: {
    type: Number,
    required: true
  },
  score2: {
    type: Number,
    required: true
  },
  score3: {
    type: Number,
    required: true
  }, 
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  }
});

module.exports = mongoose.model('Test', testSchema);