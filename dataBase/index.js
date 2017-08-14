let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

let kittySchema = mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function () {
  let greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

let Kitten = mongoose.model('Kitten', kittySchema);

let fluffy = new Kitten({ name: 'fluffy' });
//fluffy.speak();

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
});