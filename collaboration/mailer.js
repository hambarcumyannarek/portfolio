const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'narmenia878@gmail.com',
        pass: 'jvxajrprcgpwcwyg'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;