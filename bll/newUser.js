const hash = require('pbkdf2-password')();
const Users = require('./../db/users');


function addNewUser(req, res) {
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
}


module.exports = addNewUser;