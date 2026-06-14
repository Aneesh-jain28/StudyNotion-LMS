const nodemailer = require('nodemailer');

const mailSender = async(email, title, body) => {
    try {
        // Sirf 'service: "gmail"' use karna hai, host/port/secure hatana hai
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS 
            }
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion LMS', // sender address
            to: email, // list of receivers
            subject: `${title}`, // Subject line
            html: body // html body
        });
        
        console.log("Email info: ", info);
        return info;

    } catch(error) {
        console.log("Error in mailSender:", error);
        throw new Error("Failed to send email");
    }
}

module.exports = mailSender;
