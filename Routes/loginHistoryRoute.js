const express= require('express');
const router = express.Router();
const LoginHistory = require('../Model/LoginHistory');

const getClientIp = (req) =>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip.includes('::ffff:') ? ip.split('::ffff:')[1] : ip;
};

router.post('/',async (req,res)=>{
    const loginHistory = new LoginHistory({
        userId: req.body.userId,
        browser: req.body.browser,
        os: req.body.os,
        deviceType: req.body.deviceType,
        ipAddress:getClientIp(req),
    })
    try {
        await loginHistory.save();
        res.status(200).json({message:'Login history saved successfully'});
    } catch (error) {
        console.error('Error saving login history:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports=router;