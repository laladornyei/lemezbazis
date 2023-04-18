const express = require("express");
const { register, login, logout, getMe, forgotPassword, updateUser} = require('../controllers/auth') 

const router = express.Router();

const { protect } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.get('/me', protect,  getMe)
router.get('/logout', protect,  logout)
router.put('/update', protect,  updateUser)

module.exports = router