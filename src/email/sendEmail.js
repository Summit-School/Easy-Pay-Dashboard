import nodemailer from "nodemailer";
import dotenv from "dotenv";
import email from "./templates/email_template";
dotenv.config();

export default function mailer(option) {
  const html = email(option.subject, option.message);
  const transporter = nodemailer.createTransport({
    service: process.env.REACT_APP_EMAIL_SERVICE,
    auth: {
      user: process.env.REACT_APP_EMAIL_USER,
      pass: process.env.REACT_APP_EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "easykingspay237@gmail.com",
    to: option.to,
    subject: option.subject,
    html: html,
  };
  try {
    const result = transporter.sendMail(mailOptions);
    transporter.close();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// sendEmail({
//   to: mailList.toString(),
//   subject: "Rate Updated",
//   message: `
//                     <div>
//                     Easy Kings Pay updated its exchange rate.
//                     </div>
//                     <div>
//                     Log into the application to see the new rate.
//                     </div>
//                     `,
// });
