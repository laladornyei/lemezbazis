const path = require('path')
const Lemez = require("../models/Lemez");
const User = require('../models/User');
const Termek = require('../models/Termek');
const ErrorResponse = require("../utils/errorResponse");

// @desc   Get all lemezek
// @route  GET /api/lemezek
// @access Public
exports.getLemezek = async (req, res, next) => {
  try {
    const lemezek = await Lemez.find().populate({
      path: 'termekek',
      populate: {
        path: 'user',
        select: 'name email',
      }
    });
    res.status(200).json({success: true, count: lemezek.length, data: lemezek})
} catch (error) {
    next(error);
}
};

// @desc   Get single lemez
// @route  GET /api/lemezek/:id
// @access Public
exports.getLemez = async (req, res, next) => {
  try {
    const lemez = await Lemez.findById(req.params.id).populate({
      path: 'termekek',
      populate: {
        path: 'user',
        select: 'name email',
      }
    });
    if (!lemez) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    res.status(200).json({ success: true, data: lemez});
  } catch (error) {
    next(new ErrorResponse(`Lemez id (${req.params.id}) helytelen`, 404));
  }
};

// @desc   Create new lemez
// @route  POST /api/lemezek/
// @access Private
exports.createLemez = async (req, res, next) => {
  try {
    req.body.user = req.user.id
    const lemez = await Lemez.create(req.body);
    res.status(201).json({ success: true, data: lemez });
    } catch (error) {
      next(error);
    }
};

// @desc   Update lemez
// @route  PUT /api/lemezek/:id
// @access Private
exports.updateLemez= async (req, res, next) => {
  try {
    const lemez = await Lemez.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!lemez) {
        return res.status(400).json({success: false, msg: 'Not found'});
    }
    res.status(200).json({success: true, data: lemez});
} catch (error) {
    next(error);
}
};

// @desc   Delete lemez
// @route  DELETE /api/lemezek/:id
// @access Private
exports.deleteLemez = async (req, res, next) => {
  try {
    let lemez = await Lemez.findById(req.params.id)
    if (!lemez) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    // Ellenőrzés, hogy az aktuális user a tulajdonosa a törlendő képzésnek
    if (lemez.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse('A képzést csak a létrehozója törölheti!', 401)
      )
    }
    lemez = await Lemez.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    lemez.remove()
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc   Upload photo for lemez
// @route  PUT /api/lemezek/:id/photo
// @access Private
exports.lemezPhotoUpload = async (req, res, next) => {
  try {
    const lemez = await Lemez.findById(req.params.id);
    if (!lemez) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }

    if (!req.files) {
      return res.status(400).json({ success: false, msg: "Please upload a file" });
    }

    const file = req.files.file
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({ success: false, msg: "Please upload an image file" });
    }

    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return res.status(400).json({ success: false, msg: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}` });
    }

    file.name = `photo_${lemez.id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, msg: `Problem with file upload` });
      }
    })

    await Lemez.findByIdAndUpdate(req.params.id, { photo: file.name })
    res.status(200).json({
      success: true,
      data: file.name
    })
  } catch (error) {
    res.status(400).json({ success: false });
  }
};