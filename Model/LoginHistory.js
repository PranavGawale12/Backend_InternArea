const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const LoginHistorySchema = new Schema({
    userId: { 
        type: String, 
        required: true, 
    },
    browser: String,
    os: String,
    deviceType: String,
    ipAddress: {
       type: String,
       required: true
    },
    loginTime: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports=mongoose.model('LoginHistory', LoginHistorySchema);