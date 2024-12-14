const nodemailer = require('nodemailer');

const sendEmailNotification = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Daily Check-In Reminder',
        text: 'Please remember to complete your daily mental health check-in before 10 PM!',
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmailNotification;