const Users = require('./../db/users')


const exist = name => {
  return Users.findOne({ name })
}

exports.exist = exist


const add = (name, salt, hash) => {
  const user = new Users({ name: name, salt, hash })

  return user.save()
}

exports.add = add