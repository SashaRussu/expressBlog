const express = require('express')
const delCategory = require('./../dal/category').del
const delMessages = require('./../dal/message').delByCategoryId

const router = express.Router()


router.post('/', function(req, res) {
  const [categoryId, categoryName] = req.body.category.split('$')

  delCategory(categoryId)
    .then(() => delMessages(categoryId))
    .then(() => {
      req.session.success = 'Deleted category ' + categoryName;

      res.redirect('/manageCategory')
    })
    .catch(err => {
      req.session.error = 'Please, try again'

      res.redirect('/manageCategory?category=' + categoryId + '$' + categoryName)
    })
})


module.exports = router