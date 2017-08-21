const Messages = require('./../db/messages');


function newMessage(req, res) {
  let newMessage = {
    categoryid: req.body.categoryid,
    text: req.body.message,
    data: Date.now()
  };

  let message = new Messages(newMessage);

  message.save(function (err, message) {
    if (message) {
      req.session.success = 'Added message';

      res.redirect('/?categoryId=' + message.categoryid);
    } else {
      req.session.error = 'Please, write message and try again';
      res.redirect('/write');
    }
  });
}


module.exports = newMessage;