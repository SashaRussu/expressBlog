const hash = require('pbkdf2-password')();
const exist = require('../DAL/user').exist
const add = require('../DAL/user').add


const hashPassword = (pass, user = null) => {
  let userSalt = (user) ? user.salt : null

  return new Promise((resolve, reject) => {
    hash({ password: pass, salt: userSalt }, (err, pass, salt, hash) => {
      if (err) reject(err)

      resolve([user, salt, hash])
    })
  })
}


const login = (name, pass) => {
  return exist(name)
    .then(user => {
      if (!user) throw new Error('This user is not defined')

      return hashPassword(pass, user)
    })
    .then(([user, , hash]) => {
      if (hash == user.hash) return user

      throw new Error('Invalid password')
    })
}

exports.login = login


const register = (name, pass) => {
  return hashPassword(pass)
    .then( ([, salt, hash]) => add(name, salt, hash) )
    .catch(err => {
      throw new Error('This name is already used, please try with another')
    })
}

exports.register = register