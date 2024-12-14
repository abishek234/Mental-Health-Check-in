const CheckIn = require('../models/CheckIn');
const Sentiment  =  require('sentiment');
const cron = require('node-cron');
const sendEmailNotification = require('../utils/sendEmailNotification');
const User = require('../models/User');

exports.createcheckin = async (req, res) => {
    const { moodRating, stressLevel, feelings } = req.body;

    const sentiment = new Sentiment();
    const analysis = sentiment.analyze(feelings);
    
  

    let moodanalysis;
    if (analysis.score > 0) {
        moodanalysis = 'Good Mood';
    } else if (analysis.score < 0) {
        moodanalysis = 'Bad Mood';
    } else {
        moodanalysis = 'Neutral Mood';
    }

    const checkInEntry = new CheckIn({
        userId: req.user.id,
        moodRating,
        stressLevel,
        feelings,
        moodanalysis,
    });

    try {
        await checkInEntry.save();
        // Return both the check-in entry and the mood analysis
        res.status(201).json({ checkInEntry, moodanalysis });
    } catch (error) {
        res.status(400).json({ message: 'Error saving check-in data' });
    }
};

exports.getcheckin = async (req,res) => {
        try {
            const checkIns = await CheckIn.find({ userId: req.user.id });
            res.json(checkIns);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching check-in data' });
        }
};

cron.schedule('0 22 * * *', async () => {
    const users = await User.find(); // Fetch all users
    const now = new Date();

    for (const user of users) {
        const lastCheckIn = await CheckIn.findOne({ userId: user._id }).sort({ createdAt: -1 });

        if (!lastCheckIn || new Date(lastCheckIn.createdAt).getDate() !== now.getDate()) {
            // User has not checked in today
            await sendEmailNotification(user.email); // Implement email sending logic
          
        }
    }
});