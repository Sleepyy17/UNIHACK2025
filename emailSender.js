"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = require("nodemailer");
var dotenv_1 = require("dotenv");
dotenv_1.default.config(); // Load environment variables from .env file
// List of client emails
var clients = ["brian.nguyen292@gmail.com"];
// Configure the transporter (use your email credentials from environment variables)
var transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Use email from .env file
        pass: process.env.EMAIL_PASS, // Use email password from .env file
    }
});
// Email options
var mailOptions = {
    from: process.env.EMAIL_USER, // Use email from .env file
    subject: "Reminder: Create Your Daily Standup",
    text: "Hello,\n\nThis is a friendly reminder to submit your daily standup report.\n\nBest regards,\nYour Team Lead"
};
// Send email to each client
clients.forEach(function (client) {
    transporter.sendMail(__assign(__assign({}, mailOptions), { to: client }), function (error, info) {
        if (error) {
            console.log("Error sending to ".concat(client, ":"), error);
        }
        else {
            console.log("Notification sent to ".concat(client, ":"), info.response);
        }
    });
});
