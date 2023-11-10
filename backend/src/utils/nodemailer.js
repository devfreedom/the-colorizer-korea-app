import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const path = require('path');
const envPath = path.resolve(__dirname, '../config/.env/credentials.env')
require('dotenv').config({ path: envPath });

const OAuth2 = google.auth.OAuth2;

function nodeMailer({ newPassword }) {
  // GMail API를 사용하기 위한 클라이언트를 설정합니다.
  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log(err);
          reject();
        }
        resolve(token);
      });
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });

    return transporter;
  };

  // 만약 unauthorized client 오류가 발생하면 다음 코드를 사용합니다.
  /*
  tls: {
    rejectUnauthorized: false
  }
  */

  // 이메일을 전송하는 함수를 구현합니다.
  const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  };

  // 이메일을 실제로 전송합니다.
  sendEmail({
    subject: "Here is your new password for The Colorizer Korea account.",
    text: `The password reset you have requested has been done successfully. Please sign-in using this new password that we've generated for you : ${newPassword}`,
    to: inputEmail,
    from: process.env.EMAIL
  });
  
  return "Password reset email has been sent successfully.";
}