const express = require("express");
const {getTermekek, getTermek, addTermek, updateTermek, deleteTermek } = require("../controllers/termekek");

const Termek = require('../models/Termek')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router( {mergeParams:true});

const { protect, authorize } = require('../middleware/auth')

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

