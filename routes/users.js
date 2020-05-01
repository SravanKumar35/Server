var express = require('express');
var router = express.Router();
var User = require('../models/user')
var jwt = require('jsonwebtoken')

router.post('/register', function(req, res, next){
  var user = new User({
    email: req.body.email,
    name: req.body.name,
    password: User.hashPassword(req.body.pass),
    creation_dt: Date.now()
  })

  let promise = user.save()
  promise.then(function(doc){
    return res.status(201).json(doc)
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error in registering User'})
  })

})

router.post('/login', function(req, res, next){
  let promise = User.findOne({email:req.body.email}).exec();

  promise.then(function(doc){
    if(doc) {
      if(doc.isValid(req.body.pass)){
        let token = jwt.sign({name: doc.name}, 'docwithyou2019', {expiresIn : '1d'})
        return res.status(200).json(token)
      }
      else {
        return res.status(501).json({message: 'Password is incorrect'})
      }
    }
    else {
      return res.status(502).json({message: 'This mail is  not registered with us. '})
    }
  })

  promise.catch(function(err){
    return res.status(503).json({message: 'Some Internal error'})
  })

})

router.get('/name', verifyToken, function(req, res, next){
  return res.status(200).json(decodedToken.name)
})

var decodedToken=''
function verifyToken(req, res, next){
  let token = req.query.token;

  jwt.verify(token, 'docwithyou2019', function(err, tokendata){
    if(err) {
      return res.status(400).json({message: 'Unauthorized request'})
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
