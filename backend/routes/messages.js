
const express = require('express');
const router = express.Router();

const {sendMessage, getMessagesFromUser, getReceivedMessages} = require("../controllers/messages");

const { protect, authorize } = require('../middleware/auth')

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
  next();
});

router.route('/received')
  .get(protect, authorize('publisher', 'admin', 'user'), getReceivedMessages)

  router.route('/from/:senderId')
  .get(protect, authorize('publisher', 'admin', 'user'), getMessagesFromUser)

router.route('/:recipientId')
  .post(protect, authorize('publisher', 'admin', 'user'), sendMessage)

module.exports = router;
