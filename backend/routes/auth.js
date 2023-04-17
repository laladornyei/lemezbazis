const express = require("express");
const { register, login, getMe, forgotPassword} = require('../controllers/auth') 

const router = express.Router();

const { protect } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.get('/me', protect,  getMe)

module.exports = router