import dotenv from 'dotenv'
import nodemailer from "nodemailer";

dotenv.config()

const msg = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <h2 style="color: #333;">Welcome to <strong>PrepareMe AI</strong>!</h2>
      <p>Hi there,</p>
      <p>Thanks for signing up. We're excited to have you on board.</p>
      <p>Click the button below to get started:</p>
      <a href="https://prepareme.ai/start" 
         style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
         Get Started
      </a>
      <p style="margin-top: 20px;">Best regards,<br/>The PrepareMe AI Team</p>
    </div>
  `
export const sendEmail = async ({ to, subject, html }) => {
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'keerthivardhantekulapelli@gmail.com',
        pass: 'zagbdfosczxjvwhl', 
      },
    });

    const mailOptions = {
      from: `"PrepareMe AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (err) {
    console.error("Error sending email: ", err.message);
    throw new Error("Email sending failed");
  }
};

sendEmail({
    to: 'keerthivardhantekulapelli9@gmail.com', 
    subject : 'test' ,
    html : msg
  })

