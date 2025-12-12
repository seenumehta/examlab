const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    }, // Keeping numeric ID to match mock data structure initially
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    duration: String,
    enrolled: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
