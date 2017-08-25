const Categories = require('./../db/categories');

exports.get = () => Categories.find()
exports.edit = (id, name) => Categories.update({ _id: id }, { $set: { name: name } })
exports.deleteCategory = id => Categories.remove({ _id: id })

const add = name => {
  const category = new Categories({ name })
  return category.save()
}

exports.add = add