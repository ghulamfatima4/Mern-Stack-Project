// Filename - tokenSender.js
import "dotenv/config";
import nodemailer from "nodemailer";

export const VerifyEmail = (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_PASS,
    },
  });
  const mailConfigurations = {
    from: process.env.USER_MAIL,

    to: email,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:5173/verify/${token} 
           Thanks`,
  };
  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};

