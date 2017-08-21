const Categories = require('./../db/categories');
const Messages = require('./../db/messages');


function delCategory(req, res) {
  Categories.remove({ _id: req.body.categoryid }, function (err) {
    if (err) return console.error(err);
  });

  Messages.remove({ categoryid: req.body.categoryid }, function (err) {
    if (err) return console.error(err);

    req.session.success = 'Deleted category';

    res.redirect('/');
  });
}


module.exports = delCategory;