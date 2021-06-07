const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
  hypothesis: {
    type: String,
    required: true
  },
  tactic: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Story', storySchema)
