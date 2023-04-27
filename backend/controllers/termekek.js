const geocoder = require('../utils/geocoder')
const Termek = require('../models/Termek')
const Lemez = require('../models/Lemez')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

// @desc   Get termekek
// @route  GET /api/termek
// @route  GET /api/lemez/:lemezId/termekek
// @access Public
exports.getTermekek = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.lemezId) {
      filter.lemezId = req.params.lemezId;
    }
    if (req.query.lemezallapot) {
      filter.lemezallapot = req.query.lemezallapot;
    }
    if (req.query.boritoallapot) {
      filter.boritoallapot = req.query.boritoallapot;
    }
    const termekek = await Termek.find(filter)

    return res.status(200).json({
      success: true,
      count: termekek.length,
      data: termekek
    });
  } catch (error) {
    next(error);
  }
};




// @desc   Get single termek
// @route  GET /api/termekek/:id
// @access Public
exports.getTermek = async (req, res, next) => {
  try {
    const termek = await Termek.findById(req.params.id).populate("lemezId")

    if (!termek) {
      return next(new ErrorResponse(`Nincs ilyen id-jű termék: ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: termek })
  } catch (error) {
    next(error)
  }
}

// @desc   Add termek
// @route  POST /api/lemezek/:lemezId/termekek
// @access Private
exports.addTermek = async (req, res, next) => {
  try {
    req.body.lemezId = req.params.lemezId
    const lemez = await Lemez.findById(req.params.lemezId)
    req.body.user = req.user.id
    if (!lemez) {
      return next(new ErrorResponse(`Nincs ilyen id-jű lemez: ${req.params.lemezId}`, 404))
    }

    const termek = await Termek.create(req.body)

    res.status(200).json({ success: true, data: termek })
  } catch (error) {
    next(error)
  }
}

// @desc   Update termek
// @route  PUT /api/termekek/:id
// @access Private
exports.updateTermek = async (req, res, next) => {
  try {
    let termek = await Termek.findById(req.params.id)
    req.body.user = req.user.id

    if (!termek) {
      return next(new ErrorResponse(`Nincs ilyen id-jű termék: ${req.params.id}`, 404))
    }
    // Ellenőrzés, hogy az aktuális user a tulajdonosa a frissítendő képzésnek
    if (termek.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse('A képzést csak a létrehozója frissítheti!', 401)
      )
    }
    termek = await Termek.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    termek = await Termek.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({ success: true, data: termek })
  } catch (error) {
    next(error)
  }
}

// @desc   Delete termek
// @route  DELETE /api/termekek/:id
// @access Private

exports.deleteTermek = async (req, res, next) => {
  try {
    let termek = await Termek.findById(req.params.id)
    if (!termek) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    // Ellenőrzés, hogy az aktuális user a tulajdonosa a törlendő képzésnek
    if (termek.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse('A képzést csak a létrehozója törölheti!', 401)
      )
    }
    await Termek.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// exports.deleteTermek = async (req, res, next) => {
//   try {
//     const termek = await Termek.findById(req.params.id)
//     req.body.user = req.user.id
//     if (!termek) {
//       return next(new ErrorResponse(`Nincs ilyen id-jű termék: ${req.params.id}`, 404))
//     }
//    // Ellenőrzés, hogy az aktuális user a tulajdonosa a törlendő képzésnek
//    if (termek.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse('A képzést csak a létrehozója törölheti!', 401)
//     )
//   }
//   termek = await Termek.findOneAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   })
//     await termek.remove()

//     res.status(200).json({ success: true, data: {} })
//   } catch (error) {
//     next(error)
//   }
// }