const express = require('express')
const getById = require('../DAL/message').getById
const edit = require('../DAL/message').edit
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

      res.redirect('/message?category=' + categoryId + '$' + categoryName + '&messageId=' + req.body.messageId)
    })
})

router.get('/delete', (req, res) => {
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