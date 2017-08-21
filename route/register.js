const express = require('express');
const newUser = require('./../bll/newUser');

const router = express.Router();


router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  newUser(req, res);//!!!
});


module.exports = router;