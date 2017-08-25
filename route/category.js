const express = require('express')
const categoryDAL = require('../DAL/category')
const deleteMessages = require('../DAL/message').deleteByCategoryId

const { add: addCategory, edit: editCategory, deleteCategory, get: getCategories } = categoryDAL

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
      const manageCategory = () =>
          res.render('manageCategory', { categories: categories, categoryId: categoryId, categoryName: categoryName })

      if (!categories.length) {
        req.session.error = 'Don`t categories for select'

        manageCategory()

        return false
      }

      if (!categoryId) {
        categoryId = categories[0]._id
        categoryName = categories[0].name
      }

      manageCategory()
    })
    .catch()
})

router.post('/', function(req, res) {
  const categoryId = req.body.category.split('$')[0]
  const categoryName = req.body.name

  editCategory(categoryId, categoryName)
    .then(() => {
      req.session.success = 'Edited category ' + categoryName;

      res.redirect('?category=' + categoryId + '$' + categoryName)
    })
    .catch(err => {
      req.session.error = 'Please, try again'

      res.redirect('?category=' + categoryId + '$' + categoryName)
    })
})

router.post('/add', function (req, res) {
  const { name } = req.body

  addCategory(name)
    .then(category => {
      req.session.success = 'Added category ' + category.name

      res.redirect('/category?category=' + category._id + '$' + category.name)
    })
    .catch()
})

router.post('/delete', function(req, res) {
  const [categoryId, categoryName] = req.body.category.split('$')

  deleteCategory(categoryId)
    .then(() => deleteMessages(categoryId))
    .then(() => {
      req.session.success = 'Deleted category ' + categoryName;

      res.redirect('/category')
    })
    .catch(err => {
      req.session.error = 'Please, try again'

      res.redirect('/category?category=' + categoryId + '$' + categoryName)
    })
})

module.exports = router