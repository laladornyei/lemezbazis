const express = require('express');
const router = express.Router();

const {addToWishlist, getWishlistTermekek, deleteFromWishlist} = require("../controllers/wishlists");

const Wishlist = require('../models/Wishlist');

const { protect, authorize } = require('../middleware/auth')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/')
  .post(protect, authorize('publisher', 'admin', 'user'), addToWishlist)
  .get(protect, authorize('publisher', 'admin', 'user'), getWishlistTermekek)

router.route('/:itemId')
  .delete(protect, authorize('publisher', 'admin', 'user'), deleteFromWishlist)

module.exports = router;


