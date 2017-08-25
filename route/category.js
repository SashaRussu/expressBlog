const express = require('express')
const categoryDAL = require('./../dal/category')
const delMessages = require('./../dal/message').delByCategoryId

const { add, edit, del: deleteCategory, get: getCategories  } = categoryDAL

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
router.post('/add', function (req, res) {
  const { name } = req.body

  add(name)
    .then(category => {
      req.session.success = 'Added category ' + category.name

      res.redirect('http://localhost:3000/category?category=' + category._id + '$' + category.name)
    })
    .catch()
})
router.post('/delete', function(req, res) {
  const [categoryId, categoryName] = req.body.category.split('$')

  deleteCategory(categoryId)
    .then(() => delMessages(categoryId))
    .then(() => {
      req.session.success = 'Deleted category ' + categoryName;

      res.redirect('/')
    })
    .catch(err => {
      req.session.error = 'Please, try again'

      res.redirect('?category=' + categoryId + '$' + categoryName)
    })
})

module.exports = router