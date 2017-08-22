const express = require('express');
const addCategory = require('./../DAL/category').addCategory

const router = express.Router();


router.get('/add', function (req, res) {
  if (req.session.user) {
    res.locals.viewType = 'add';
    res.locals.categoryId = req.session.categoryId;
    res.render('main');
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
})


router.post('/add', function (req, res) {
  const { categoryname: name } = req.body
  addCategory(name)
    .then(category => {
      req.session.success = 'Added category ' + category.name;
      res.redirect('/?categoryId=' + category.categoryid)
    })
    .catch(err => {
      req.session.error = 'Please, write category and try again';
      res.redirect('/add');
    })
});


module.exports = router;