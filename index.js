const express = require('express');
const app = express();

const route = require('./routing');

app.use('/', route);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});