const Termek = require('../models/Post')
const Lemez = require('../models/Hozzaszolas')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse');
const Post = require('../models/Post');
const Hozzaszolas = require('../models/Hozzaszolas');


// @desc   Upload hozzaszolas
// @route  POST /api/post:id/hozzaszolasok
// @access Private
exports.uploadHozzaszolas = async (req, res, next) => {
  try {
    req.body.post = req.params.post
    const post = await Post.findById(req.params.post)
    req.body.user = req.user.id
    if (!post) {
      return next(new ErrorResponse(`Nincs ilyen id-jű post: ${req.params.post}`, 404))
    }

    const hozzaszolas = await Hozzaszolas.create(req.body)

    res.status(200).json({ success: true, data: hozzaszolas })
  } catch (error) {
    next(error)
  }
}

// @desc   Update hozzaszolas
// @route  PUT /api/hozzaszolasok/:id
// @access Private
exports.updateHozzaszolas = async (req, res, next) => {
  try {
    let hozzaszolas = await Hozzaszolas.findById(req.params.id)
    req.body.user = req.user.id

    if (!hozzaszolas) {
      return next(new ErrorResponse(`Nincs ilyen id-jű hozzaszolas: ${req.params.id}`, 404))
    }
// Ellenőrzés, hogy az aktuális user a tulajdonosa a frissítendő képzésnek
if (hozzaszolas.user.toString() !== req.user.id && req.user.role !== 'admin') {
  return next(
    new ErrorResponse('A hozzászólást csak a létrehozója frissítheti!', 401)
  )
}
hozzaszolas = await Hozzaszolas.findOneAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true
})
hozzaszolas = await Hozzaszolas.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({ success: true, data: hozzaszolas })
  } catch (error) {
    next(error)
  }
}

// @desc   Delete post
// @route  DELETE /api/postok/:id
// @access Private
exports.deleteHozzaszolas = async (req, res, next) => {
  try {
    let hozzaszolas = await Hozzaszolas.findById(req.params.id)
    if (!hozzaszolas) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    // Ellenőrzés, hogy az aktuális user a tulajdonosa a törlendő hozzaszolasnak
    if (hozzaszolas.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse('A képzést csak a létrehozója törölheti!', 401)
      )
    }
    hozzaszolas = await Hozzaszolas.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    hozzaszolas.remove()
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};