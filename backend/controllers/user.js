const User= require('../models/User');

// @desc Get user by ID
// @route GET /api/users/:id
// @access Public
exports.getUserById = async (req, res, next) => {
    try {
    const user = await User.findById(req.params.id);
    if (!user) {
    return res.status(404).json({ success: false, msg: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
    } catch (error) {
    next(error);
    }
    };