const mongoose = require('mongoose');

// Define Rating schema
const ratingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        ratedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        },
        rating: { type: Number, required: true }, // Rating value (e.g. 1-5)
        comment: { type: String, required: true }, // Rating comment
    },
    { timestamps: true }
);

// Create Rating model
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
