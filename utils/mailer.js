const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
<<<<<<< HEAD
<<<<<<< HEAD
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL,
        clientId: process.env.GMAIL_CLIENTID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRENSH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN
=======
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'atcweb513@gmail.com',
        pass: 'atc_513666',
>>>>>>> 5b2d9ed... add mailing system
=======
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL,
        clientId: process.env.GMAIL_CLIENTID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRENSH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN
>>>>>>> 883528f... use OATH2 for gmail
    },
})

const sendEmail = async (subject, text, html) => {
    transporter.sendMail({
        from: "ATCWeb <atcweb513@gmail.com>",
        to: process.env.EMAILS,
        subject: subject,
        text: text,
        html: html
    }).catch(e => { });
}

module.exports = {
    sendEmail,
}