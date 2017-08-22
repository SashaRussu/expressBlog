const express = require('express');
const newUser = require('./../bll/newUser');

const router = express.Router();


router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', newUser);

module.exports = router;