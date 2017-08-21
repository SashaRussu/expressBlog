const Messages = require('./../db/messages');


function delMessage(req, res) {
  Messages.remove({ _id: req.query.messageId }, function (err) {
    if (err) return console.error(err);

    req.session.success = 'Deleted message';

    res.redirect('/?categoryId=' + req.session.categoryId);
  });
}


module.exports = delMessage;