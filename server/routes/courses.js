const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const asyncHandler = require('../utils/asyncHandler');
const { protect, requireRole } = require('../middleware/authMiddleware');

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const courses = await Course.find({}).sort({ id: 1 });
    res.json(courses);
}));

// @route   GET api/courses/:id
// @desc    Get single course by ID
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const courseId = Number(req.params.id);
    const course = await Course.findOne({ id: courseId });

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
}));

// @route   POST api/courses
// @desc    Create a new course
// @access  Private (instructor/admin)
router.post('/', protect, requireRole('instructor', 'admin'), asyncHandler(async (req, res) => {
    const payload = req.body;

    if (!payload.id || !payload.title || !payload.description || !payload.category || !payload.difficulty) {
        return res.status(400).json({ message: 'id, title, description, category, and difficulty are required' });
    }

    const existing = await Course.findOne({ id: payload.id });
    if (existing) {
        return res.status(400).json({ message: 'Course with this id already exists' });
    }

    const course = await Course.create(payload);
    res.status(201).json(course);
}));

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private (instructor/admin)
router.put('/:id', protect, requireRole('instructor', 'admin'), asyncHandler(async (req, res) => {
    const courseId = Number(req.params.id);
    const updates = req.body;

    const course = await Course.findOneAndUpdate({ id: courseId }, updates, { new: true, runValidators: true });

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
}));

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private (admin)
router.delete('/:id', protect, requireRole('admin'), asyncHandler(async (req, res) => {
    const courseId = Number(req.params.id);
    const course = await Course.findOne({ id: courseId });

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();
    res.json({ message: 'Course removed' });
}));

module.exports = router;
