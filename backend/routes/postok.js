const express = require("express");
const {
    getPostok,
    getPost,
    uploadPost,
    updatePost,
    deletePost
} = require("../controllers/postok");

const advancedResults = require('../middleware/advancedResults')

const hozzaszolasRouter = require('./hozzaszolasok');
const Post = require("../models/Post");
const Hozzaszolas = require('../models/Hozzaszolas')

const router = express.Router();

const { protect, authorize } = require('../middleware/auth')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use('/:post/hozzaszolasok', hozzaszolasRouter)

router.route("/")
  .get(advancedResults(Post, 'hozzaszolasok'), getPostok)
  .post(protect, authorize('publisher', 'admin', 'user'), uploadPost);

router
  .route("/:id")
  .get(advancedResults(Post, 'hozzaszolasok'), getPost)
  .put(protect, authorize('publisher', 'admin', 'user'),updatePost)
  .delete(protect, authorize('publisher', 'admin', 'user'),deletePost);

module.exports = router;

