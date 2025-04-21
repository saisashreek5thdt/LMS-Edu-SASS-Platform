// lib/email.js
import nodemailer from "nodemailer";

// Configure the transporter (SMTP settings)
const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST || "smtp.example.com", // Replace with your SMTP host
    //   port: parseInt(process.env.SMTP_PORT || "587"), // Replace with your SMTP port
    //   secure: false, // Use `true` for port 465, `false` for other ports
    //   auth: {
    //     user: process.env.SMTP_USER, // Your SMTP username
    //     pass: process.env.SMTP_PASSWORD, // Your SMTP password
    //   },
    service: "gmail", // or use SMTP settings for other providers
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (email, verificationLink) => {
    try {
        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL_USER}>`, // Sender address
            to: email, // Recipient address
            subject: "Verify Your Account", // Email subject
            html: `
        <h1>Verify Your Account</h1>
        <p>Thank you for registering! Please click the link below to verify your account:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Account</a>
        <p>If you did not register, please ignore this email.</p>
      `, // Email body in HTML format
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }
};