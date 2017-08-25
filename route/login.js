const express = require('express')
const login = require('../bll/user').login

const router = express.Router()


router.get('/', (req, res) => res.render('login'))

router.post('/', (req, res) => {
  const { name, password: pass } = req.body

  login(name, pass)
    .then(user => {
      req.session.user = user

      req.session.success = 'Hello ' + user.name

      res.redirect('/')
    })
    .catch(err => {
      req.session.error = err.message

      res.redirect('/login')
    })
})


module.exports = router