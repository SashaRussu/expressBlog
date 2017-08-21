const Messages = require('./../db/messages');
const Categories = require('./../db/categories');


function getData(req, res) {
  Categories.find(function (err, categories) {
    if (err) return console.error(err);

    if (!categories.length) {
      req.session.error = 'Don`t categories for select';
      res.redirect('/add');

      return 0;
    }

    if (!req.query.categoryId) {
      res.render('main', {categories: categories});

      return 0;
    }

    Messages
      .find({categoryid: req.query.categoryId})
      .sort({data: -1})
      .exec(function (err, messages) {
        if (err) return console.error(err);

        if (messages.length) {
          res.render('main', {categories: categories, messages: messages});
        } else {
          req.session.error = 'Don`t messages in this category';
          res.redirect('/');
        }
      });
  });
}


module.exports = getData;