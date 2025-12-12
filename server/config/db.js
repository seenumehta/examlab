const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI is not defined. Please set it in your environment.');
    }

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
    });

    console.log('MongoDB connected successfully');
};

module.exports = connectDB;

