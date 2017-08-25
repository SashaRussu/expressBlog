const express = require('express')
const path = require('path')

const session = require('./route/session')
const route = require('./route/route')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.use(session)
app.use(route)


if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}