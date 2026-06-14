const sgMail = require('@sendgrid/mail');

// SendGrid ko API key assign karo
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSender = async (email, title, body) => {
    try {
        const msg = {
            to: email, // Jisko OTP bhejna hai
            from: 'aneeshjain781@gmail.com', // ⚠️ IMP: Yahan EXACTLY wahi email likhna jo SendGrid par verify kiya hai
            subject: title,
            html: body,
        };

        const info = await sgMail.send(msg);
        console.log("Email sent successfully via SendGrid!");
        return info;

    } catch (error) {
        console.log("Error in mailSender:", error);
        // Agar error aati hai toh detail print karo
        if (error.response) {
            console.error(error.response.body);
        }
        throw new Error("Failed to send email");
    }
}

module.exports = mailSender;
