import nodemailer from "nodemailer";
import {config} from "dotenv";
config();

const sendemail = async (email,emailToken) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.pass,
    },
  });
  const mailData = {
    from: process.env.EMAIL_ID,
    to:"suvajit@itobuz.com",
    subject: "Email Verification",
    text: `Verify your email`,
    html:`<p>Hello, verify your email address by clicking on this</p>
    <br>
    <a href="http://localhost:8000/verify/${emailToken}">Click here to verify</a>
    `
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("Email Sent succesfully");
    }
  });
};
export default sendemail;
