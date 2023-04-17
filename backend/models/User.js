const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    role: {
        type: String,
        enum: ['user', 'publisher'], //admin-t kézzel lehet csak beállítani!
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false   //Amikor lekérünk egy felhasználót az API-tól
        //nem fogja visszaadni a jelszót
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

// Add a virtual field to calculate the average rating
UserSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) {
      return null
    }
    const sum = this.ratings.reduce((acc, cur) => acc + cur.rating, 0)
    return sum / this.ratings.length
  })
  

// A jelszó titkosítása bcrypt-tel
UserSchema.pre('save', async function (next) {
    
if(!this.isModified('password')){
    next()
}

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// A JWT aláírása és visszaadása
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// A felhasználó által megadott jelszó és 
// az adatbázisban tárolt hashelt jelszó összehasonlítása
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Password token létrehozása és titkosítása
UserSchema.methods.getResetPasswordToken = function () {
    // Token generálása
    const resetToken = crypto.randomBytes(20).toString('hex')
    // A token hash-elése és a resetPasswordToken mező beállítása
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    // A lejárat beállítása (10 perc)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('User', UserSchema)