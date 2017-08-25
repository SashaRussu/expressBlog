const Categories = require('./../db/categories');


const get = () => {
  return Categories.find()
}

exports.get = get


const add = name => {
  const category = new Categories({ name })

  return category.save()
}

exports.add = add


const edit = (id, name) => {
  return Categories.update({ _id: id }, { $set: { name: name } })
}

exports.edit = edit


const del = id => {
  return Categories.remove({ _id: id })
}

exports.del = del