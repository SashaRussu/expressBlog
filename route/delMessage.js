const express = require('express')
const deleteMessage = require('../DAL/message').deleteById

const router = express.Router()

router.get('/', (req, res) => {
  if (!req.session.user) {
    req.session.error = 'Access denied!'
    res.redirect('/login')

    return false
  }

  let categoryId = null, categoryName = null

  if (req.query.category) {
    [categoryId, categoryName] = req.query.category.split('$')
  }

  deleteMessage(req.query.messageId)
    .then(data => {
      req.session.success = 'Deleted message';

      res.redirect('/?category=' + categoryId + '$' + categoryName)
    })
    .catch(err => {
      req.session.error = 'Please, try again'

      res.redirect('/?category=' + categoryId + '$' + categoryName)
    })
})

module.exports = router