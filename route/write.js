const express = require('express');
const getCategories = require('./../bll/getCategories');
const newMessage = require('./../bll/newMessage');

const router = express.Router();


router.route('/write')
  .get(function(req, res) {
    if (req.session.user) {
      res.locals.viewType = 'write';

      res.locals.categoryId = req.session.categoryId;

      getCategories(req, res);
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  })
  .post(function(req, res) {
    newMessage(req, res);
  });


module.exports = router;