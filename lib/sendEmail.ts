const nodemailer = require("nodemailer");

export const SendEmail = async (email: string, OTP: string) => {
  console.log("Sending email to:", email);

  // Updated transport configuration
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Changed from true to false for development
    auth: {
      user: process.env.SMTP_AUTH_USER, // Your Mailtrap credentials
      pass: process.env.SMTP_AUTH_USER,
    },
    tls: {
      rejectUnauthorized: false, // Only for development!
    },
  });

  try {
    const info = await transport.sendMail({
      from: '"CyConnect" <no-reply@cyconnect.com>',
      to: email,
      subject: "Your Verification Code",
      text: `Dear user,\n\nYour verification code is ${OTP}\n\nThis code expires in 10 minutes.`,
      html: `<p>Dear user,</p>
             <p>Your verification code is <strong>${OTP}</strong></p>
             <p>This code expires in 10 minutes.</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send verification email");
  }
};
