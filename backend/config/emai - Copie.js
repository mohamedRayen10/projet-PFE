const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: rayentoujani02@gmail.com,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = transporter;