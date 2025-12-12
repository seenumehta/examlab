const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    duration: String,
    completed: {
        type: Boolean,
        default: false,
    }
});

const fileSchema = new mongoose.Schema({
    id: Number,
    name: String,
    size: String,
    downloads: {
        type: Number,
        default: 0,
    }
});

const announcementSchema = new mongoose.Schema({
    id: Number,
    title: String,
    date: String,
    content: String
});

const faqSchema = new mongoose.Schema({
    id: Number,
    question: String,
    answer: String
});

const labSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    }, // Match frontend numeric ID
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: String,
    duration: String,
    difficulty: String,
    enrolled: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    modules: [moduleSchema],
    files: [fileSchema],
    announcements: [announcementSchema],
    faqs: [faqSchema]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Lab', labSchema);
