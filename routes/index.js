var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId
var Appointment = require('../models/appointment')

router.get('/appointments', (req, res) => {
    Appointment.find((err, docs) => {
        if(!err) { res.send(docs) }
        else { console.log('Error in Retrieving Appointments : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { return res.status(400).send('No record with given id : ${req.params.id} ' )}

    Appointment.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.send(docs)
        }
        else {  console.log('Error in retrieving appointment : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { return res.status(400).send('No record with given id: ${req.params.id}') }

    var aptmt = {
        title : req.body.title,
        name : req.body.name,
        age : req.body.age,
        mobile : req.body.mobile,
        eid : req.body.eid,
        bgroup : req.body.bgroup,
        email : req.body.email,
        address : req.body.address,
        city : req.body.city,
        pincode : req.body.pincode,
        referral : req.body.referral,
        channel : req.body.channel,
        service_name : req.body.service_name,
        service_price : req.body.service_price,
        discount : req.body.discount,
        total_price : req.body.total_price,
        doctor_name : req.body.doctor_name,
        doctor_email : req.body.doctor_email,
        appointment_date : req.body.appointment_date,
        duration : req.body.duration,
        hours : req.body.hours,
        min : req.body.min,
        shift : req.body.shift
    }

    Appointment.findByIdAndUpdate(req.params.id, {$set : aptmt}, { new: true }, (err, docs) => {
        if(!err) { res.send(docs) }
        else { console.log('Error in Apointment update : ' + JSON.stringify(err, undefined, 2));
         }
    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { return res.status(400).send('No record with given id: ${req.params.id}') }

    Appointment.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) { res.send(docs) }
        else { console.log('Error in Appointment Delete: ' + JSON.stringify(err, undefined, 2));
         }
    })
})

router.post('/book-appointment', (req, res) => {
    var aptmt = new Appointment({
        title : req.body.title,
        name : req.body.name,
        age : req.body.age,
        mobile : req.body.mobile,
        eid : req.body.eid,
        bgroup : req.body.bgroup,
        email : req.body.email,
        address : req.body.address,
        city : req.body.city,
        pincode : req.body.pincode,
        referral : req.body.referral,
        channel : req.body.channel,
        service_name : req.body.service_name,
        service_price : req.body.service_price,
        discount : req.body.discount,
        total_price : req.body.total_price,
        doctor_name : req.body.doctor_name,
        doctor_email : req.body.doctor_email,
        appointment_date : req.body.appointment_date,
        duration : req.body.duration,
        hours : req.body.hours,
        min : req.body.min,
        shift : req.body.shift
    })

    aptmt.save((err, docs) => {
        if(!err) { res.send(docs)}
        else { console.log('Error in adding appointment : ' + JSON.stringify(err, undefined, 2));
         }
    })
})

module.exports = router;
