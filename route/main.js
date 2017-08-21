const express = require('express');
const getData = require('./../bll/getData');

const router = express.Router();


router.get('/', function(req, res) {
  if (!req.session.user) {
    req.session.error = 'Access denied!';
    res.redirect('/login');

    return 0;
  }

  res.locals.viewType = 'read';

  res.locals.categoryId = req.query.categoryId;
  req.session.categoryId = res.locals.categoryId;

  getData(req, res);
});


module.exports = router;