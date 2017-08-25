const express = require('express')
const getCategories = require('../DAL/category').get
const getMessages = require('../DAL/message').get

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

  getCategories()
    .then(categories => {
      if (!categories.length) {
        req.session.error = 'Don`t categories for select'

        res.redirect('/category')

        return false
      }

      if (!categoryId) {
        categoryId = categories[0]._id
        categoryName = categories[0].name
      }

      return getMessages(categoryId)
        .then(messages => {
          //if (!messages.length) throw new Error('Don`t messages in category ' + categoryName)

          res.render('mainPage',
              { categories: categories, messages: messages, categoryId: categoryId, categoryName: categoryName })
        })
    })
    .catch(err => {
      req.session.error = err.message

      res.redirect('/')
    })
})


module.exports = router