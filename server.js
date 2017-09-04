const express = require('express')
const path = require('path')

const session = require('./route/session')
const route = require('./route/route')

const app = express()

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)

// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))
// app.use(express.static(path.join(__dirname, 'public')))
//
// //app.use(session)
// //app.use(route)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath, quiet: true
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res) => {
  res.sendFile(path.resolve('index.html'))
})

app.listen(3000, () => {
  console.log('App listening on port 3000!\n')
})