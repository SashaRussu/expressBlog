const express = require('express');
const bodyParser = require('body-parser');
const hash = require('pbkdf2-password')();
const path = require('path');
const session = require('express-session');

const login = require('./route/login');
const register = require('./route/register');
const main = require('./route/main');
const write = require('./route/write');
const delMessage = require('./route/delMessage');
const add = require('./route/add');


const app = express();


/** Шаблон */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


/** Сесії */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'secret text for salt'
}));

app.use(function(req, res, next){
  let err = req.session.error;
  let msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});


app.route('/login')
  .get(login)
  .post(login);


app.route('/register')
  .get(register)
  .post(register);


app.get('/', main);


/** Виведення записів */
app.post('/read', function(req, res) {
  res.redirect('/?categoryId=' + req.body.categoryid);
});


/** Додавання запису */
app.route('/write')
  .get(write)
  .post(write);


/** Видалення запису */
app.get('/delMessage', delMessage);


/** Додавання категорії */
app.route('/add')
  .get(add)
  .post(add);


/** Вихід */
app.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
});


if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}