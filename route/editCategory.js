const express = require('express')
const edit = require('./../dal/category').edit

const router = express.Router()


router.post('/', function(req, res) {
  const categoryId = req.body.category.split('$')[0]
  const categoryName = req.body.name

  edit(categoryId, categoryName)
    .then(() => {
      req.session.success = 'Edited category ' + categoryName;

      res.redirect('/manageCategory?category=' + categoryId + '$' + categoryName)
    })
    .catch(err => {
      req.session.error = 'Please, try again'

      res.redirect('/manageCategory?category=' + categoryId + '$' + categoryName)
    })
})


module.exports = router