const express = require('express');
const hash = require('pbkdf2-password')();
const path = require('path');

const session = require('./route/session');
const login = require('./route/login');
const register = require('./route/register');
const main = require('./route/main');
const write = require('./route/write');
const delMessage = require('./route/delMessage');
const add = require('./route/add');
const delCategory = require('./route/delCategory');


const app = express();


/** Шаблон */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


/** Сесії */
app.use(session);


/** Авторизація */
app.route('/login')
  .get(login)
  .post(login);


/** Реєстрація */
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


/** Видалення категорії */
app.route('/delCategory')
  .get(delCategory)
  .post(delCategory);


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