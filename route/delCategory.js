const express = require('express');
const getCategories = require('./../bll/getCategories');
const delCategory = require('./../bll/delCategory')

const router = express.Router();


router.route('/delCategory')
  .get(function(req, res) {
    if (req.session.user) {
      res.locals.viewType = 'delCategory';

      res.locals.categoryId = req.session.categoryId;

      getCategories(req, res);
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  })
  .post(function(req, res) {
    delCategory(req, res);
  });


module.exports = router;