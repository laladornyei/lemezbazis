const Rating = require('../models/Rating');
const User = require('../models/User');

// @desc   Add rating for user
// @route  POST /api/ratings/:userId
// @access Private
exports.addRating = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { userId } = req.params;
    const { id: userIdFromToken } = req.user;

    const ratedUser = await User.findById(userId);

    if (!ratedUser) {
      return res.status(404).json({ success: false, msg: 'Felhasználó nem található' });
    }

    const newRating = new Rating({
      user: userId,
      ratedBy: userIdFromToken,
      rating,
      comment
    });
    await newRating.save();

    res.status(201).json({ success: true, msg: 'Értékelés sikeresen hozzáadva' });

  } catch (error) {
    console.log('Error occurred while adding rating:', error);
    res.status(500).json({ success: false, msg: 'Hiba történt az értékelés hozzáadása során' });
  }
};

// @desc   Get ratings for user
// @route  GET /api/ratings/:userId
// @access Public
exports.getRatings = async (req, res, next) => {

  try {
    const userId  = req.params.userId;
    const ratings = await Rating.find({user: userId})
      .populate({
        path: 'ratedBy'
      })
      .populate({
        path: 'user'
      });

    res.status(200).json({ success: true, data: ratings });

  } catch (error) {
    res.status(500).json({ success: false, msg: 'Hiba történt az értékelések lekérése során', error });
  }
};

// @desc   Update rating
// @route  PUT /api/ratings/:id
// @access Private
exports.updateRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const { id: userIdFromToken } = req.user; 

    const updatedRating = await Rating.findByIdAndUpdate(id, { rating, comment }, { new: true });

    if (!updatedRating) {
      return res.status(404).json({ success: false, msg: 'Értékelés nem található' });
    }

    if (updatedRating.ratedBy.toString() !== userIdFromToken) {
      return res.status(401).json({ success: false, msg: 'Nincs jogosultsága az értékelés frissítéséhez' });
    }

    res.status(200).json({ success: true, msg: 'Értékelés sikeresen frissítve', data: updatedRating });

  } catch (error) {
    console.log('Error occurred while adding rating:', error);
    res.status(500).json({ success: false, msg: 'Hiba történt az értékelés frissítése során', error });
  }
};

// @desc   Delete rating
// @route  DELETE /api/ratings/:id
// @access Private
exports.deleteRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userIdFromToken } = req.user; 

    const deletedRating = await Rating.findByIdAndDelete(id);

    if (!deletedRating) {
      return res.status(404).json({ success: false, msg: 'Értékelés nem található' });
    }

    if (deletedRating.ratedBy.toString() !== userIdFromToken) {
      return res.status(401).json({ success: false, msg: 'Nincs jogosultsága az értékelés törléséhez' });
    }

    res.status(200).json({ success: true, msg: 'Értékelés sikeresen törölve', data: deletedRating });

  } catch (error) {
    console.log('Error occurred while deleting rating:', error);
    res.status(500).json({ success: false, msg: 'Hiba történt az értékelés törlése során', error });
  }
};
