const mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
    id: Number,
    description: String,
    value: String
});

const taskFileSchema = new mongoose.Schema({
    id: Number,
    name: String,
    size: String
});

const submissionSchema = new mongoose.Schema({
    id: Number,
    timestamp: String,
    status: String,
    points: Number
});

const taskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String, // 'lab', 'mcq', 'assignment'
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    timeLimit: Number,
    attempts: {
        type: Number,
        default: 0,
    },
    maxAttempts: Number,
    instructions: String,
    hints: [String],
    files: {
        type: [taskFileSchema],
        default: [],
    },
    flags: {
        type: [flagSchema],
        default: [],
    },
    submissions: {
        type: [submissionSchema],
        default: [],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);
