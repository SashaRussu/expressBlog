const express = require('express')
const add = require('./../dal/category').add

const router = express.Router()


router.post('/', function (req, res) {
  const { name } = req.body

  add(name)
    .then(category => {
      req.session.success = 'Added category ' + category.name

      res.redirect('/manageCategory?category=' + category._id + '$' + category.name)
    })
    .catch()
})


module.exports = router