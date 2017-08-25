const express = require('express')
const getCategories = require('./../dal/category').get

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

        res.render('manageCategory', { categories: categories, categoryId: categoryId, categoryName: categoryName })

        return false
      }

      if (!categoryId) {
        categoryId = categories[0]._id
        categoryName = categories[0].name
      }

      res.render('manageCategory', { categories: categories, categoryId: categoryId, categoryName: categoryName })
    })
    .catch()
})


module.exports = router