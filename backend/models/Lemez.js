const mongoose = require("mongoose");


const LemezSchema = new mongoose.Schema({
  lemezcim: {
    type: String,
    required: [true, 'Lemezcím mező kitöltése közelező!'],
    unique: true
},
eloado: {
    type: String,
    required: [true, 'Előadót meg kell adnia!']
},
evjarat: {
    type: Number,
    required: [true, 'Évjáratot meg kell adnia!']

},
mufaj: {
    type: Array, 
    required: [true, 'Műfajt/műfajokat meg kell adnia!']
},
zeneszamok: {
    type: Array, 
    required: [true, 'Zeneszámot/zeneszámokat meg kell adnia!']
},
photo: {
  type: String
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
LemezSchema.virtual('termekek', {
  ref: 'Termek',
  localField: '_id',
  foreignField: 'lemezId',
  justOne: false
})

module.exports = mongoose.model("Lemez", LemezSchema, "lemezek");
