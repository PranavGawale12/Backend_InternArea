const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const express =require("express");
const { text } = require("body-parser");
require('dotenv').config()
const router= express.Router();

const otpStore = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const generateOTP = () =>{
    return randomstring.generate({length:6,charset:'numeric'});
};

router.post('/', async(req,res)=>{
    const { email } = req.body;
    const otp = generateOTP();

    const mailOptions = {
        from: 'pranav.gawale47@gmail.com',
        to: email,
        subject: 'Email Verification OTP',
        text: `Your OTP for email verification is: ${otp}`,
    };

    try{
        console.log(`Sending OTP to ${email}`); // Add logging
    await transporter.sendMail(mailOptions);
    otpStore[email] = otp;
    console.log(`OTP sent successfully to ${email}`); // Add logging
    res.status(200).json({ message: 'OTP sent successfully!' });

    }catch(error){
        console.error('Error sending OTP:',error);
        res.status(500).json({error: 'Failed to send OTP'});
    }
});

router.post('/verify-email-otp', (req, res) => {
    const { email, otp } = req.body;
  
    if (otpStore[email] === otp) {
      delete otpStore[email]; // Remove OTP after successful verification
      res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  });

module.exports=router;