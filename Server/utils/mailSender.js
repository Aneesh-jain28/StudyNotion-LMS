const nodemailer = require('nodemailer');

const mailSender = async(email, title, body) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, //  smtp.gmail.com
            port:465,
            secure:true,
            auth: {
                user: process.env.MAIL_USER, // Your email address
                pass: process.env.MAIL_PASS  // Your email password or app password
            },
            tls:{
                rejectUnauthorized: false
            },
        });

        let info = await transporter.sendMail({
            from: `StudyNotion`, // sender address
            to: email, // list of receivers
            subject: `${title}`, // Subject line
            html: body // html body
        });
        console.log(info);

        return info; // Return the info object if needed
    }

    catch(error) {
        console.log("Error in mailSender:", error);
        throw new Error("Failed to send email");
    }
}

module.exports = mailSender;
