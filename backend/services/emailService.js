import dotenv from 'dotenv'
import nodemailer from "nodemailer";
import { registerTemplate, reminderTemplate } from '../utils/emailTemplates';

dotenv.config()

const getHtml = (forWhat , msgData)=>{
  switch (forWhat) {
    case 1: return registerTemplate(msgData)
    case 2: return reminderTemplate(msgData)
    case 3: return RoadmapCompletionTemplate(msgData)
    case 4: return generalAnnuncement(msgData)
    default:
      break;
  }
}

export const sendEmail = async ({ to, subject, forWhat , msgData}) => {
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
  const html = getHtml(forWhat , msgData)

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
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

