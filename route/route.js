const express = require('express')

const login = require('./login')
const register = require('./register')
const mainPage = require('./mainPage')
const category = require('./category')
const addMessage = require('./addMessage')
const message = require('./message')
const logout = require('./logout')

const route = express()

route.use('/login', login)

route.use('/register', register)

route.use('/', mainPage)

route.use('/category', category)

route.use('/addMessage', addMessage)

route.use('/message', message)

route.use('/logout', logout)

module.exports = route