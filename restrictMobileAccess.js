const uaParser = require('ua-parser-js');

const restrictMobileAccess = (req,res,next)=>{
    const currentDate =  new Date();
    const currentHour = currentDate.getHours();
    const userAgent= req.headers['user-agent'];
    const parsedUA = uaParser(userAgent);
    const deviceType = parsedUA.device.type || 'desktop';

    if(deviceType === 'mobile' && (currentHour < 10 || currentHour >= 13)){
        return res.status(403).json({ error: 'Access restricted outside allowed hours.' })
    }
    next();
};

module.exports = restrictMobileAccess;