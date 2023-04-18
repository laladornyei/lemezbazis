const express = require("express");
const {
  getLemez,
  getLemezek,
  createLemez,
  updateLemez,
  deleteLemez,
  lemezPhotoUpload
} = require("../controllers/lemezek");

const advancedResults = require('../middleware/advancedResults')

const termekRouter = require('./termekek');
const Lemez = require("../models/Lemez");

const router = express.Router();

const { protect, authorize } = require('../middleware/auth')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use('/:lemezId/termekek', termekRouter)

router.route('/:id/photo')
.put(protect, authorize('publisher', 'admin', 'user'), lemezPhotoUpload)

router.route("/")
  .get(getLemezek)
  .post(protect, authorize('publisher', 'admin', 'user'), createLemez);

router
  .route("/:id")
  .get(getLemez)
  .put(protect, authorize('publisher', 'admin', 'user'),updateLemez)
  .delete(protect, authorize('publisher', 'admin', 'user'),deleteLemez);

module.exports = router;
