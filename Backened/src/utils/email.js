import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter =  nodemailer.createTransport({
    service:'gmail',
    secure:true,
    auth:{
        user:'process.env.EMAIL_USER',
        pass:'process.env.EMAIL_PASS'
    }
})

const sendEmail = (recipientEmail, subject, text) => {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: recipientEmail,
      subject: subject,
      text: text
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
  };
  
  export default sendEmail;