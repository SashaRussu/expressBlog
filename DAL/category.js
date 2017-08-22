const Categories = require('./../db/categories');

const addCategory = name => {
  const category = new Categories({ name })

  return category.save()
}

exports.addCategory = addCategory