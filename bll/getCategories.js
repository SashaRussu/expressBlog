const Categories = require('./../db/categories');


function getCategories(req, res) {
  Categories.find(function (err, categories) {
    if (err) return console.error(err);

    if (categories.length) {
      res.render('main', {categories: categories});
    } else {
      req.session.error = 'Don`t categories for select';
      res.redirect('/add');
    }
  });
}


module.exports = getCategories;