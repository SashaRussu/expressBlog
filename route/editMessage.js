const express = require('express')
const getById = require('./../dal/message').getById
const edit = require('./../dal/message').edit

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

  getById(req.query.messageId)
    .then(message => {
      res.render('editMessage', { messageEdit: message, categoryId: categoryId, categoryName: categoryName })
    })
    .catch()
})

router.post('/', (req, res) => {
  let categoryId = null, categoryName = null

  if (req.body.category) {
    [categoryId, categoryName] = req.body.category.split('$')
  }

  edit(req.body.messageId, req.body.message)
    .then(message => {
      req.session.success = 'Edited message'

      res.redirect('/?category=' + categoryId + '$' + categoryName)
    })
    .catch(err => {
      req.session.error = 'Please, write message and try again'

      res.redirect('/editMessage?category=' + categoryId + '$' + categoryName + '&messageId=' + req.body.messageId)
    })
})


module.exports = router