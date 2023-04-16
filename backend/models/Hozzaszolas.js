const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HozzaszolasSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true
  }
});

module.exports = mongoose.model("Hozzaszolas", HozzaszolasSchema, "hozzaszolasok");