const express = require('express');
const bodyParser = require('body-parser');
const hash = require('pbkdf2-password')();
const path = require('path');
const session = require('express-session');

const app = express();


/** Шаблон */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


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


/** База */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

let usersSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  salt: String,
  hash: String
});

let Users = mongoose.model('Users', usersSchema);


/** Автентифікація */
function authenticate(name, pass, fn) {
  let user = null;

  Users.findOne({name: name}, function (err, users) {
    if (err) return console.error(err);

    user = users;

    if (!user) return fn(new Error('This user is not defined'));

    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
      if (err) return fn(err);
      if (hash == user.hash) return fn(null, user);
      fn(new Error('Invalid password'));
    });
  });
}


/** Головна сторінка */
app.get('/', function(req, res) {
  if (req.session.user) {
    res.render('main');
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
});


/** Авторизація */
app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      req.session.user = user;

      req.session.success = 'Hello ' + user.name;

      res.redirect('/');
    } else {
      req.session.error = err.message;
      res.redirect('/login');
    }
  });
});


/** Реєстрація */
app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  let newUser = {
    name: req.body.username
  };

  hash({ password: req.body.password }, function (err, pass, salt, hash) {
    if (err) throw err;

    newUser.salt = salt;
    newUser.hash = hash;

    let user = new Users(newUser);

    user.save(function (err, user) {
      if (user) {
        req.session.user = user;

        req.session.success = 'Hello ' + user.name;

        res.redirect('/');
      } else {
        req.session.error = 'This name is already used, please try with another';
        res.redirect('/register');
      }
    });
  });
});


/** Вихід */
app.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/');
  });
});


if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}