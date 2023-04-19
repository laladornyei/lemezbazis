const Lemez = require("../models/Lemez");
const User = require('../models/User');
const Termek = require('../models/Termek');
const Wishlist = require('../models/Wishlist');
const ErrorResponse = require('../utils/errorResponse')


//hozzáadás
exports.addToWishlist = async (req, res, next) => {
  try {
    const user = req.user.id;
    const wishlist = await Wishlist.findOne({ user: user });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const itemId = req.body.termek;
    const existingItem = wishlist.termekek.find((termek) => termek.equals(itemId));

    if (existingItem) {
      return res.status(400).json({ message: 'Item already exists in wishlist' });
    }

    const item = await Termek.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    wishlist.termekek.push(item._id);
    await wishlist.save();

    res.status(201).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//lekérés
exports.getWishlistTermekek = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: 'termekek',
      populate: { path: 'lemezId' } // Populate the lemezId field in the termekek array
    });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.status(200).json(wishlist.termekek);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
  };

  // törlés
 exports.deleteFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    if (!wishlist.termekek.includes(itemId)) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }
    wishlist.termekek.pull(itemId);
    await wishlist.save();
    res.json({ message: 'Item deleted from wishlist' });
  } catch (error) {
    next(error);
  }


  
};
  
  

  
  
  
    
      
      
          
      
