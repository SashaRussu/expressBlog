const Categories = require('./../db/categories');


function addCategories(req, res) {
  let newCategory = {
    name: req.body.categoryname
  };

  let category = new Categories(newCategory);

  category.save(function (err, category) {
    if (category) {
      req.session.success = 'Added category ' + category.name;

      res.redirect('/?categoryId=' + category.categoryid);
    } else {
      req.session.error = 'Please, write category and try again';
      res.redirect('/add');
    }
  });
}


module.exports = addCategories;