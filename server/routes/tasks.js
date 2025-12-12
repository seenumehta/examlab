const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');
const { protect, requireRole } = require('../middleware/authMiddleware');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const tasks = await Task.find({}).sort({ id: 1 });
    res.json(tasks);
}));

// @route   GET api/tasks/:id
// @desc    Get task details by ID
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const taskId = Number(req.params.id);
    const task = await Task.findOne({ id: taskId });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
}));

// @route   POST api/tasks
// @desc    Create a task
// @access  Private (instructor/admin)
router.post('/', protect, requireRole('instructor', 'admin'), asyncHandler(async (req, res) => {
    const payload = req.body;

    if (!payload.id || !payload.title || !payload.description || !payload.type) {
        return res.status(400).json({ message: 'id, title, description and type are required' });
    }

    const existing = await Task.findOne({ id: payload.id });
    if (existing) {
        return res.status(400).json({ message: 'Task with this id already exists' });
    }

    const task = await Task.create(payload);
    res.status(201).json(task);
}));

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private (instructor/admin)
router.put('/:id', protect, requireRole('instructor', 'admin'), asyncHandler(async (req, res) => {
    const taskId = Number(req.params.id);
    const updates = req.body;

    const task = await Task.findOneAndUpdate({ id: taskId }, updates, { new: true, runValidators: true });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
}));

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private (admin)
router.delete('/:id', protect, requireRole('admin'), asyncHandler(async (req, res) => {
    const taskId = Number(req.params.id);
    const task = await Task.findOne({ id: taskId });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
}));

// @route   POST api/tasks/:id/submit
// @desc    Submit a flag
// @access  Private (logged in)
router.post('/:id/submit', protect, asyncHandler(async (req, res) => {
    const { flag } = req.body;
    const taskId = Number(req.params.id);

    if (!flag) {
        return res.status(400).json({ message: 'flag is required' });
    }

    const task = await Task.findOne({ id: taskId });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const isCorrect = task.flags.some(f => f.value === flag);

    // Save submission entry
    const submission = {
        id: task.submissions.length + 1,
        timestamp: new Date().toISOString(),
        status: isCorrect ? 'correct' : 'incorrect',
        points: isCorrect ? task.points : 0,
    };

    task.submissions.push(submission);
    task.attempts = (task.attempts || 0) + 1;
    await task.save();

    res.json({
        correct: isCorrect,
        message: isCorrect ? 'Correct flag submitted!' : 'Incorrect flag. Please try again.',
        submission,
    });
}));

module.exports = router;
