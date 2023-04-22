const path = require('path')
const User = require('../models/User')
const Wishlist = require('../models/Wishlist')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')

// @desc   Register user
// @route  POST /api/auth/register
// @access Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body

    //Create user
    const user = await User.create({ name, email, password, role })
    const wishlist = new Wishlist({ user: user._id });
    await wishlist.save();
    sendTokenResponse(user, 200, res)
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message })
  }
}

// @desc   Update user details
// @route  PUT /api/auth/update
// @access Private
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // A felhasználó megkeresése az adatbázisban
    const user = await User.findById(req.user.id)

    if (!user) {
      return next(new ErrorResponse('Felhasználó nem található', 404))
    }

    // Név és email frissítése
    if (name) {
      user.name = name
    }
    if (email) {
      user.email = email
    }

    // Jelszó frissítése, ha meg van adva
    if (password) {
      user.password = password
    }

    await user.save()

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message })
  }
}

// @desc   Logout user
// @route  POST /api/auth/logout
// @access Private
exports.logout = async (req, res, next) => {
  try {
    // Clear the token cookie to logout the user
    res.clearCookie('token')

    res.status(200).json({ success: true, msg: 'Felhasználó kijelentkezett.' })
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Sikertelen kijelentkezés.' })
  }
}


// @desc   Login user
// @route  POST /api/auth/login
// @access Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // email és jelszó ellenőrzése
    if (!email || !password) {
      return next(
        new ErrorResponse(
          'Kérem adjon meg egy email címet és egy jelszót!',
          400,
        ),
      )
    }

    // A felhasználó megkeresése az adatbázisban
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new ErrorResponse('Érvénytelen email vagy jelszó!', 401))
    }

    // A jelszó megfelelőségének ellenőrzése
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse('Érvénytelen email vagy jelszó!', 401))
    }

    sendTokenResponse(user, 200, res)
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message })
  }
}

// Token megszerzése a modeltől, süti létrehozása és válasz küldése
const sendTokenResponse = (user, statusCode, res) => {
  // Token létrehozása
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: true,
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}

// @desc   A bejelentkezett felhasználó megszerzése
// @route  POST /api/auth/me
// @access Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message })
  }
}
// @desc   Elfelejtett jelszó
// @route  POST /api/auth/forgotPassword
// @access Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return next(new ErrorResponse('There is no user that email', 404))
    }
    // A reset token megszerzése
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })
    // A visszaállítási URL létrehozása
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`
    const message = `Azért kaptad ezt az emailt, mert egy kérés érkezett hozzánk a jelszavad visszaállítására. A jelszó visszaállításához kattints az alábbi linkre: \n\n ${resetUrl}`
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message
      })
      res.status(200).json({
        success: true,
        data: 'Email elküldve',
      })
    } catch (error) {
      console.log(err);
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save({ validateBeforeSave: false })
      return next(new ErrorResponse('Email nem lett elküldve', 500))
    }

  } catch (error) {
    res.status(400).json({ success: false, msg: error.message })
  }
}