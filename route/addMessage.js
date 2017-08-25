const express = require('express')
const getCategories = require('../DAL/category').get
const add = require('../DAL/message').add

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

      res.render('addMessage', { categories: categories, categoryId: categoryId, categoryName: categoryName })
    })
    .catch()
})

router.post('/', (req, res) => {
  let categoryId = null, categoryName = null

  if (req.body.category) {
    [categoryId, categoryName] = req.body.category.split('$')
  }

  add(categoryId, req.body.message, Date.now())
    .then(message => {
      req.session.success = 'Added message'

      res.redirect('/?category=' + categoryId + '$' + categoryName)
    })
    .catch(err => {
      req.session.error = 'Please, write message and try again'

      res.redirect('/addMessage?category=' + categoryId + '$' + categoryName)
    })
})


module.exports = router