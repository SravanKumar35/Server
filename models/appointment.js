const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var schema = mongoose.Schema({
    title: {type: String},
    name: {type: String},
    age: {type: Number},
    mobile: {type: Number},
    eid: {type: Number},
    bgroup: {type: String},
    email: {type: String},
    address: {type: String},
    city: {type: String},
    pincode: {type: Number},
    referral: {type: String},
    channel: {type: String},
    service_name: {type: String},
    service_price: {type: Number},  
    discount: {type: Number},
    total_price: {type: Number},
    doctor_name: {type: String},
    doctor_email: {type: String},
    appointment_date: {type: String},
    duration: {type: String},
    hours: {type: String},
    min: {type: String},
    shift: {type: String},

});

module.exports = mongoose.model('Appointment', schema)