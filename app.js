const express = require('express');
const apiRouter = require('./routes/api');
const {
  handlesStatusErrors,
  handles400s,
  handles404s,
  handles405s,
} = require('./errors/index');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', handles404s);

app.use(handlesStatusErrors);

app.use(handles400s);

app.use(handles405s);

module.exports = app;
