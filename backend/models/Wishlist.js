const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  termekek: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Termek',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Wishlist', WishlistSchema, "wishlists");
