const express = require('express');
const bodyParser = require('body-parser');
const hash = require('pbkdf2-password')();
const path = require('path');
const session = require('express-session');

const login = require('./route/login');
const register = require('./route/register');
const main = require('./route/main');


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


app.route('/')
  .get(main)
  .post(main);


/** Виведення записів */
app.post('/read', function(req, res) {
  res.redirect('/?categoryId=' + req.body.categoryid);
});


/** Додавання запису */
app.route('/write')
  .get(function(req, res) {
    if (req.session.user) {
      res.locals.viewType = 'write';

      res.locals.categoryId = req.session.categoryId;

      Categories.find(function (err, categories) {
        if (err) return console.error(err);

        if (categories.length) {
          res.render('main', {categories: categories});
        } else {
          req.session.error = 'Don`t categories for select';
          res.redirect('/add');
        }
      });
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  })
  .post(function(req, res) {
    let newMessage = {
      categoryid: req.body.categoryid,
      text: req.body.message,
      data: Date.now()
    };

    let message = new Messages(newMessage);

    message.save(function (err, message) {
      if (message) {
        req.session.success = 'Added message';

        res.redirect('/?categoryId=' + message.categoryid);
      } else {
        req.session.error = 'Please, write message and try again';
        res.redirect('/write');
      }
    });
  });


/** Додавання категорії */
app.route('/add')
  .get(function(req, res) {
    if (req.session.user) {
      res.locals.viewType = 'add';

      res.locals.categoryId = req.session.categoryId;

      res.render('main');
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  })
  .post(function(req, res) {
    let newCategory = {
      name: req.body.categoryname
    };

    let category = new Categories(newCategory);

    category.save(function (err, category) {
      if (category) {
        req.session.success = 'Added category ' + category.name;

        res.redirect('/?categoryId=' + category.categoryid);
      } else {
        req.session.error = 'Please, write category and try again';
        res.redirect('/add');
      }
    });
  });


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