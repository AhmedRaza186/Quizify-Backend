import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASSWORD,
    },
});

export const sendOtpEmail = async (fullName, email, otp) => {
    console.log(email + 'otp');
    
    try {
        const mailOptions = {
            from: `"Quizify" <${process.env.MY_EMAIL}>`,
            to: email,
            subject: 'Verify your Quizify Account',
            html: `
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 16px;">
                    <h1 style="color: #4361EE; text-align: center;">Quizify</h1>
                    <p style="font-size: 18px;">Hi ${fullName},</p>
                    <p style="font-size: 16px; color: #94a3b8;">Welcome to Quizify! Your account is almost ready. Please use the following One-Time Password (OTP) to verify your email address:</p>
                    <div style="background: rgba(67, 97, 238, 0.1); border: 1px solid #4361EE; padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0;">
                        <span style="font-size: 32px; font-weight: 800; letter-spacing: 10px; color: #4CC9F0;">${otp}</span>
                    </div>
                    <p style="font-size: 14px; color: #94a3b8; text-align: center;">This code will expire in 10 minutes.</p>
                    <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;">
                    <p style="font-size: 12px; color: #64748b; text-align: center;">If you didn't create an account with Quizify, you can safely ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, data: info };
    } catch (error) {
        console.error('Nodemailer Error:', error);
        return { success: false, error };
    }
};
