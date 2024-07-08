const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const otpSchema = new Schema({
    phoneNumber : String,
    otp : String
});

module.exports = mongoose.model('otpSchema',otpSchema);