/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import config from 'dotenv';
import nodemailer from 'nodemailer';
config.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS_2FA,
  },
});
//Rider verification
export = {
  verifyUserEmail: async (email: string, token: string) => {
    const link = `${process.env.ROOT_URL}/verify/${token}`;
    const temp = `
     <div style="max-width: 700px;
     margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
     <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome Dispatch Buddy</h2>
      <p>Dear Customer, Follow the link by clicking on the button to verify your email
      </p>
       <a href=${link}
       style="background: crimson; text-decoration: none; color: white;
        padding: 10px 20px; margin: 10px 0;
       display: inline-block;">Click here</a>
      </div>
      `;
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: temp,
    };
    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
};


/*
[
  {
    "id": "c50ec6b8-4893-4318-801e-63b8493b5692",
    "name": "Ugo Basil",
    "email": "ohuruogubasil@gmail.com",
    "password": "$2a$08$SHRamFMk55iR6.BJ1zJSK.FYgKWJN0LKELAz5sFgihsLTyLTJgsBS",
    "phoneNumber": "08138448759",
    "city": "hello people",
    "bikeDocument": "bikeDocument is required",
    "validId": "validId is required",
    "avatar": "",
    "isVerified": false,
    "role": "rider",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM1MGVjNmI4LTQ4OTMtNDMxOC04MDFlLTYzYjg0OTNiNTY5MiIsImlhdCI6MTY2OTMyMDMzNCwiZXhwIjoxNjY5MzIyMTM0fQ.TloLkNckUV5Su5zo9kom_-tgUuCQ23M7kGPIw192iGs",
    "createdAt": "2022-11-24 21:05:34.527+01",
    "updatedAt": "2022-11-24 21:05:34.527+01"
  }
]
*/