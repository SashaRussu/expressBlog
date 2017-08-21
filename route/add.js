const express = require('express');
const addCategory = require('./../bll/getCategories');

const router = express.Router();


router.route('/add')
  .get(function(req, res) {
    if (req.session.user) {
      res.locals.viewType = 'add';

      res.locals.categoryId = req.session.categoryId;

      res.render('main');
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  })
  .post(function(req, res) {
    addCategory(req, res);
  });


module.exports = router;