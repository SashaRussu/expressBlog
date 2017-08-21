const express = require('express');
const auth = require('./../bll/auth');

const router = express.Router();


router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  auth(req.body.username, req.body.password, function(err, user){
    if (user) {
      req.session.user = user;

      req.session.success = 'Hello ' + user.name;

      res.redirect('/');
    } else {
      req.session.error = err.message;

      res.redirect('/login');
    }
  });
});


module.exports = router;