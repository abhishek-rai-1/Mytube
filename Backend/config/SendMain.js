import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service : "gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  console.log(err || "SMTP Ready");
});

const sendMail = async (to, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "Reset Your Password",
            html: `
                <p>Your OTP for Password Reset is <b>${otp}</b>.</p>
                <p>It expires in 5 minutes.</p>
            `,
        });
    } catch (error) {
        console.error("Mail error:", error);
        throw error;
    }
};

export default sendMail;