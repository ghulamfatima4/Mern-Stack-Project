// Filename - tokenSender.js
import "dotenv/config";
import nodemailer from "nodemailer";

export const sendOtpMail = (otp, email) => {
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
    subject: "Password Reset OTP ",

    html : `<p>Your otp for password reset is : <br> ${otp}</b></p>`
  };
  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("OTP Sent Successfully");
    console.log(info);
  });
};

