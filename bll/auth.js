const hash = require('pbkdf2-password')();
const Users = require('./../db/users');


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


module.exports = authenticate;