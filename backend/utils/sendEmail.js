import nodemailer from 'nodemailer';

let transporter;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    return transporter;
};

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email, otp, type = 'register') => {
    const isRegister = type === 'register';
    const subject = isRegister ? 'Verify Your Email - Blog App' : 'Reset Your Password - Blog App';
    const heading = isRegister ? 'Email Verification' : 'Password Reset';
    const message = isRegister
        ? 'Use the OTP below to verify your email and complete your registration.'
        : 'Use the OTP below to reset your password.';

    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #9810fa, #ad46ff); padding: 32px 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">${heading}</h1>
      </div>
      <div style="padding: 32px 24px; text-align: center;">
        <p style="color: #555; font-size: 15px; margin-bottom: 24px;">${message}</p>
        <div style="background: #fff; border: 2px dashed #9810fa; border-radius: 8px; padding: 20px; margin: 0 auto; display: inline-block;">
          <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #9810fa;">${otp}</span>
        </div>
        <p style="color: #999; font-size: 13px; margin-top: 24px;">This OTP expires in <strong>10 minutes</strong>.</p>
        <p style="color: #bbb; font-size: 12px; margin-top: 16px;">If you didn't request this, please ignore this email.</p>
      </div>
    </div>
    `;

    await getTransporter().sendMail({
        from: `"Blog App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html,
    });
};
