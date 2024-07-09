const express = require('express');
const router = express.Router();

const twilio = require('twilio');

const OtpModel = require('../Model/otpSchema');
require('dotenv').config()



const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const generateOTP = () =>{
  return Math.floor(100000 + Math.random() * 900000)
}

router.post('/send-otp-phone', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const otp = generateOTP();
    try {
      const otpDocument = new OtpModel({
        phoneNumber,
        otp
      });
      otpDocument.save();
      const message = await twilioClient.messages.create({
        body: `Your OTP for verification is: ${otp}`,
        to: `+${phoneNumber}`,
        from: process.env.TWILIO_PHONE_NUMBER
      });

      console.log('OTP sent:', message.sid);
      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  });
  
  router.post('/verify-otp-phone', async (req, res) => {
    const { phoneNumber, otp } = req.body;
  
    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    try {
      const otpDocument = await OtpModel.findOne({
        phoneNumber,
        otp
      });

      if(otpDocument){
        res.send({ success:true });
      }else{
        res.status(401).send({success: false, error: "Invalid OTP"})
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  });
  
  module.exports = router;