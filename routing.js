const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('page onload');
  next();
});

router.get('/', (req, res, next) => {
  console.log('first part main page');
  next();
}, (req, res, next) => {
  console.log('second part main page');
  next();
});

router.get('/', (req, res) => {
  console.log('third part main page');
  res.send('It is main page');
});

router.get('/about', (req, res) => {
  console.log('first part about page');
  res.send('It is about page');
});

module.exports = router;