const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err.status, '<<<<<<');
  res.status(422).send({ msg: 'Apologies! Unprocessable entity' });
});

module.exports = app;
