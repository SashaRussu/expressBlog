const express = require('express');
const delMessage = require('./../bll/delMessage')

const router = express.Router();


router.get('/delMessage', function(req, res) {
  if (req.session.user) {
    res.locals.categoryId = req.session.categoryId;

    delMessage(req, res);
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
});


module.exports = router;