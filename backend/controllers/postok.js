const Post = require('../models/Post');
const Lemez = require('../models/Hozzaszolas');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


// @desc   Get all post
// @route  GET /api/post
// @access Public
exports.getPostok = async (req, res, next) => {
    try {
      const { topic } = req.query; 
      let query;

      if (topic) {
        query = Post.find({ topic: topic }).populate({
          path: 'user'
        })
      }
     else {
      query = Post.find().populate({
        path: 'user'
      })
    }

    const postok = await query;
    res.status(200).json({ success: true, count: postok.length, data: postok })
  } catch (error) {
    next(error);
  }
};

  

// @desc   Get single post
// @route  GET /api/postok/:id
// @access Public
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate({ path: 'user' })
    .populate({ path: 'hozzaszolasok', populate: { path: 'user' } });
    

    if (!post) {
      return next(new ErrorResponse(`Nincs ilyen id-jű post: ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: post })
  } catch (error) {
    next(error)
  }
}

// @desc   Upload post
// @route  POST /api/postok/
// @access Private
exports.uploadPost = async (req, res, next) => {
  try {
    req.body.user = req.user.id
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
};

// @desc   Update post
// @route  PUT /api/postok/:id
// @access Private
exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id)
    req.body.user = req.user.id

    if (!post) {
      return next(new ErrorResponse(`Nincs ilyen id-jű post: ${req.params.id}`, 404))
    }
// Ellenőrzés, hogy az aktuális user a tulajdonosa a frissítendő képzésnek
if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
  return next(
    new ErrorResponse('A postot csak a létrehozója frissítheti!', 401)
  )
}
post = await Post.findOneAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true
})
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({ success: true, data: post })
  } catch (error) {
    next(error)
  }
}

// @desc   Delete post
// @route  DELETE /api/postok/:id
// @access Private
exports.deletePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    // Ellenőrzés, hogy az aktuális user a tulajdonosa a törlendő postnak
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse('A postot csak a létrehozója törölheti!', 401)
      )
    }
    post = await Post.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    post.remove()
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}