const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/authMiddleware');

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @route   POST api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'username, email and password are required' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        username,
        email,
        password,
        role: role || 'student',
    });

    res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    });
}));

// @route   POST api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
}));

// @route   GET api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, asyncHandler(async (req, res) => {
    res.json(req.user);
}));

// @route   PUT api/auth/me
// @desc    Update current user profile
// @access  Private
router.put('/me', protect, asyncHandler(async (req, res) => {
    const updates = {};
    const { username, email, password, role } = req.body;

    if (username) updates.username = username;
    if (email) updates.email = email;
    if (role) updates.role = role;
    if (password) updates.password = password;

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, updates);
    await user.save();

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    });
}));

module.exports = router;
