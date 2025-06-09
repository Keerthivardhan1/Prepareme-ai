import dotenv from 'dotenv'
import nodemailer from "nodemailer";

dotenv.config()
export const sendEmail = async ({ to, subject, html }) => {
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'keerthivardhantekulapelli@gmail.com',
        pass: 'tosnoynpaaidxrcz', 
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

/*
sendEmail({
    to: 'keerthivardhantekulapelli9@gmail.com', 
    subject : 'test' ,
    html : '<h1> Hello </h1>'
  })

*/