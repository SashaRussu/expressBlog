const Categories = require('./../db/categories');

const get = () => Categories.find()

exports.get = get


const add = name => {
  const category = new Categories({ name })

  return category.save()
}

exports.add = add


const edit = (id, name) => Categories.update({ _id: id }, { $set: { name: name } })

exports.edit = edit


const deleteCategory = id => Categories.remove({ _id: id })

exports.deleteCategory = deleteCategory