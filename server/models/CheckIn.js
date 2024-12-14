const mongoose = require('mongoose');

const CheckInSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moodRating: { type: Number, required: true },
    stressLevel: { type: Number, required: true },
    feelings: { type: String },
    createdAt: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    moodanalysis: { type: String },
});

module.exports = mongoose.model('CheckIn', CheckInSchema);