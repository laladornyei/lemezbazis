const express = require("express");
const { register, login, getMe, forgotPassword} = require('../controllers/auth') 

const router = express.Router();

const { protect } = require('../middleware/auth')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post('/register', register)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.get('/me', protect,  getMe)

module.exports = router