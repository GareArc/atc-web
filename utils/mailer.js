const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL,
        clientId: process.env.GMAIL_CLIENTID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRENSH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN
    },
})

const sendEmail = async (subject, text, html) => {
    transporter.sendMail({
        from: "ATCWeb <atcweb513@gmail.com>",
        to: process.env.EMAILS,
        subject: subject,
        text: text,
        html: html
    }).catch(e => console.log(e));
}

module.exports = {
    sendEmail,
}