const mongoose = require("mongoose");
const TermekSchema = new mongoose.Schema({
    egysegar:{
        type:Number,
        required: [true, "Kérjük adjon meg egy árat!"],
      },
      lemezallapot: {
        type: String,
        required: [true, "Lemezállapot megadása kötelező!"],
       
        maxlength: [50, "Maximum 50 karaktert használhat!"],
      },
      boritoallapot: {
        type: String,
        required: [true, "Borítóállapot megadása kötelező!"],
      
        maxlength: [50, "Maximum 50 karaktert használhat!"],
      },
      leiras: {
        type: String,
        required: [true, "Kérjük adjon meg leírást a termékhez!"],
        unique: [false, "Hiba"],
        maxlength: [500, "Leírás maximum 500 karakteres lehet!"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      lemezId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lemez'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
})
//jaguz
module.exports = mongoose.model("Termek", TermekSchema, "termekek");