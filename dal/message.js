const Messages = require('./../db/messages');


const get = categoryId => {
  return Messages.find({ categoryId }).sort({data: -1})
}

exports.get = get


const getById = id => {
  return Messages.findOne({ _id: id })
}

exports.getById = getById


const add = (categoryId, text, data) => {
  const message = new Messages({ categoryId, text: text, data: data })

  return message.save()
}

exports.add = add


const edit = (id, message) => {
  return Messages.update({ _id: id }, { $set: { text: message } })
}

exports.edit = edit


const delById = id => {
  return Messages.remove({ _id: id })
}

exports.delById = delById


const delByCategoryId = categoryId => {
  return Messages.remove({ categoryId: categoryId })
}

exports.delByCategoryId = delByCategoryId