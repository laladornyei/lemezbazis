const mongoose = require("mongoose");
const geocoder = require('../utils/geocoder');


const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
},
topic: {
  type: String,
  required: true,
    enum: [
      "Zene",
      "Technikai",
      "Műszaki",
      "Előadók",
      "Hibaelhárítás",
      "Keresek",
      "Egyéb",
    ]
},
description: {
    type: String
},
createdAt: {
  type: Date,
  default: Date.now,
},
user: {
  type: mongoose.Schema.ObjectId,
  ref: 'User',
  required: true
}
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});



// Fordított populate virtual segítségével
PostSchema.virtual('hozzaszolasok', {
  ref: 'Hozzaszolas',
  localField: '_id',
  foreignField: 'post',
  justOne: false
})

module.exports = mongoose.model("Post", PostSchema, "postok");
