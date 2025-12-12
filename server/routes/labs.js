const express = require('express');
const router = express.Router();
const Lab = require('../models/Lab');
const asyncHandler = require('../utils/asyncHandler');
const { protect, requireRole } = require('../middleware/authMiddleware');

// @route   GET api/labs
// @desc    Get all labs
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const labs = await Lab.find({}).sort({ id: 1 });
    res.json(labs);
}));

// @route   GET api/labs/:id
// @desc    Get lab details by ID
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const labId = Number(req.params.id);
    const lab = await Lab.findOne({ id: labId });

    if (!lab) {
        return res.status(404).json({ message: 'Lab not found' });
    }

    res.json(lab);
}));

// @route   POST api/labs
// @desc    Create a lab
// @access  Private (instructor/admin)
router.post('/', protect, requireRole('instructor', 'admin'), asyncHandler(async (req, res) => {
    const payload = req.body;

    if (!payload.id || !payload.title || !payload.description) {
        return res.status(400).json({ message: 'id, title and description are required' });
    }

    const exists = await Lab.findOne({ id: payload.id });
    if (exists) {
        return res.status(400).json({ message: 'Lab with this id already exists' });
    }

    const lab = await Lab.create(payload);
    res.status(201).json(lab);
}));

// @route   PUT api/labs/:id
// @desc    Update a lab
// @access  Private (instructor/admin)
router.put('/:id', protect, requireRole('instructor', 'admin'), asyncHandler(async (req, res) => {
    const labId = Number(req.params.id);
    const updates = req.body;

    const lab = await Lab.findOneAndUpdate({ id: labId }, updates, { new: true, runValidators: true });

    if (!lab) {
        return res.status(404).json({ message: 'Lab not found' });
    }

    res.json(lab);
}));

// @route   DELETE api/labs/:id
// @desc    Delete a lab
// @access  Private (admin)
router.delete('/:id', protect, requireRole('admin'), asyncHandler(async (req, res) => {
    const labId = Number(req.params.id);
    const lab = await Lab.findOne({ id: labId });

    if (!lab) {
        return res.status(404).json({ message: 'Lab not found' });
    }

    await lab.deleteOne();
    res.json({ message: 'Lab removed' });
}));

module.exports = router;
