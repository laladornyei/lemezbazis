const express = require("express");
const { getUserById } = require('../controllers/user');
const router = express.Router();

// const { protect } = require('../middleware/auth')

router.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
next();
});

router.get('/:id', getUserById);

module.exports = router;