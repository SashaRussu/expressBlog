const express = require('express')
const register = require('./../bll/user').register

const router = express.Router()


router.get('/', (req, res) => res.render('register'))

router.post('/', (req, res) => {
  const { name, password: pass } = req.body

  register(name, pass)
    .then(user => {
      req.session.user = user

      req.session.success = 'Hello ' + user.name

      res.redirect('/')
    })
    .catch(err => {
      req.session.error = err.message

      res.redirect('/register')
    })
})


module.exports = router