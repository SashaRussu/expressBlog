const express = require('express')

const login = require('./login')
const register = require('./register')
const mainPage = require('./mainPage')
const addMessage = require('./addMessage')
const editMessage = require('./editMessage')
const delMessage = require('./delMessage')
const logout = require('./logout')
const category = require('./category')


const route = express()


route.use('/login', login)
route.use('/category', category)

route.use('/register', register)

route.use('/', mainPage)

route.use('/addMessage', addMessage)

route.use('/editMessage', editMessage)

route.use('/delMessage', delMessage)

route.use('/logout', logout)


module.exports = route;