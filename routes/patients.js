var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId
var Patient = require('../models/patient')

router.get('/view', (req, res) => {
    Patient.find((err, docs) => {
        if(!err) { res.send(docs) }
        else { console.log('Error in Retrieving Patients : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { return res.status(400).send('No record with given id : ${req.params.id} ' )}

    Patient.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.send(docs)
        }
        else {  console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { return res.status(400).send('No record with given id: ${req.params.id}') }

    var ptnt = {
        title : req.body.title,
        name : req.body.name,
        age : req.body.age,
        mobile : req.body.mobile,
        bgroup : req.body.bgroup,
        email : req.body.email,
        address : req.body.address,
        city : req.body.city,
        pincode : req.body.pincode,
        referral : req.body.referral,
        channel : req.body.channel,
    }

    Patient.findByIdAndUpdate(req.params.id, {$set : ptnt}, { new: true }, (err, docs) => {
        if(!err) { res.send(docs) }
        else { console.log('Error in Apointment update : ' + JSON.stringify(err, undefined, 2));
         }
    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { return res.status(400).send('No record with given id: ${req.params.id}') }

    Patient.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) { res.send(docs) }
        else { console.log('Error in Patient Delete: ' + JSON.stringify(err, undefined, 2));
         }
    })
})

router.post('/add', (req, res) => {
    var ptnt = new Patient({
        title : req.body.title,
        name : req.body.name,
        age : req.body.age,
        mobile : req.body.mobile,
        bgroup : req.body.bgroup,
        email : req.body.email,
        address : req.body.address,
        city : req.body.city,
        pincode : req.body.pincode,
        referral : req.body.referral,
        channel : req.body.channel,
    })

    ptnt.save((err, docs) => {
        if(!err) { res.send(docs)}
        else { console.log('Error in adding Patient : ' + JSON.stringify(err, undefined, 2));
         }
    })
})

module.exports = router;
