const express = require('express')

const login = require('./login')
const register = require('./register')
const mainPage = require('./mainPage')
const addMessage = require('./addMessage')
const editMessage = require('./editMessage')
const delMessage = require('./delMessage')
const manageCategory = require('./manageCategory')
const addCategory = require('./addCategory')
const editCategory = require('./editCategory')
const delCategory = require('./delCategory')
const logout = require('./logout')


const route = express()


route.use('/login', login)

route.use('/register', register)

route.use('/', mainPage)

route.use('/addMessage', addMessage)

route.use('/editMessage', editMessage)

route.use('/delMessage', delMessage)

route.use('/manageCategory', manageCategory)

route.use('/addCategory', addCategory)

route.use('/editCategory', editCategory)

route.use('/delCategory', delCategory)

route.use('/logout', logout)


module.exports = route;