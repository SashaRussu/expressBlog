const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'secret text for salt'
}));

router.use(function(req, res, next){
  let err = req.session.error;
  let msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});


module.exports = router;