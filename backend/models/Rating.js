const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        ratedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        rating: { type: Number, required: true }, 
        comment: { type: String, required: true }, 
    },
    { timestamps: true }
);

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
