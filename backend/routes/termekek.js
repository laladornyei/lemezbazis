const express = require("express");
const {getTermekek, getTermek, addTermek, updateTermek, deleteTermek } = require("../controllers/termekek");

const Termek = require('../models/Termek')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router( {mergeParams:true});

const { protect, authorize } = require('../middleware/auth')

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
  next();
});

router.route('/')
  .get(advancedResults(Termek, {
    path: 'lemezId'
  }), getTermekek)
  .post(protect, authorize('publisher', 'admin', 'user'),addTermek)

router.route('/:id')
  .get(getTermek)
  .put(protect, authorize('publisher', 'admin', 'user'),updateTermek)
  .delete(protect, authorize('publisher', 'admin', 'user'),deleteTermek)

module.exports = router;

