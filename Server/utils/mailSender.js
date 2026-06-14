const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,             // Port 465 aur 'gmail' service bypass karne ke liye STARTTLS port
            secure: false,         // Port 587 ke liye false hona zaroori hai
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            },
            //  THE FIX: Render free tier bahut slow hai. Isko 60 seconds (60000ms) tak wait karne ko bolo!
            connectionTimeout: 60000,
            greetingTimeout: 60000,
            socketTimeout: 60000,
        });

        console.log("Attempting to send email to: ", email);

        let info = await transporter.sendMail({
            // Google ab strict hai. 'From' mein exactly tumhari email id honi chahiye warna wo drop kar dega
            from: `"StudyNotion LMS" <${process.env.MAIL_USER}>`, 
            to: email,
            subject: `${title}`,
            html: body
        });
        
        console.log("Email info: ", info.response);
        return info;

    } catch (error) {
        console.log("Error in mailSender:", error);
        throw error;
    }
}

module.exports = mailSender;
