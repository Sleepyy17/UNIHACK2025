import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 
const clients = ["brian.nguyen292@gmail.com"];

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,   
        pass: process.env.EMAIL_PASS,   
    }
});


const mailOptions = {
    from: process.env.EMAIL_USER,    
    subject: "Reminder: Create Your Daily Standup",
    text: "Hello,\n\nThis is a friendly reminder to submit your daily standup report.\n\nBest regards,\nYour Team Lead"
};


clients.forEach(client => {
    transporter.sendMail({ ...mailOptions, to: client }, (error, info) => {
        if (error) {
            console.log(`Error sending to ${client}:`, error);
        } else {
            console.log(`Notification sent to ${client}:`, info.response);
        }
    });
});
