const express = require("express");
const {uploadHozzaszolas, updateHozzaszolas, deleteHozzaszolas } = require("../controllers/hozzaszolasok");

const Hozzaszolas = require('../models/Hozzaszolas')
const Post = require('../models/Post')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router( {mergeParams:true});

const { protect, authorize } = require('../middleware/auth')

router.route('/')
  .post(protect, authorize('publisher', 'admin', 'user'),uploadHozzaszolas)

router.route('/:id')
  .put(protect, authorize('publisher', 'admin', 'user'),updateHozzaszolas)
  .delete(protect, authorize('publisher', 'admin', 'user'),deleteHozzaszolas)

module.exports = router;
