const express = require('express');
const router = express.Router();
const { addRating, getRatings, updateRating, deleteRating } = require('../controllers/ratings');
const { protect, authorize } = require('../middleware/auth')


router.route('/:userId')
    .post(protect, authorize('publisher', 'admin', 'user'), addRating)
    .get(protect, authorize('publisher', 'admin', 'user'), getRatings)


router.route('/:id')
    .put(protect, authorize('publisher', 'admin', 'user'), updateRating)
    .delete(protect, authorize('publisher', 'admin', 'user'), deleteRating)

router.put('/:id', protect, updateRating);

module.exports = router;

