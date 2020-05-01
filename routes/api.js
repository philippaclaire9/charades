const apiRouter = require('express').Router();

const wordsRouter = require('./words');

apiRouter.use('/words', wordsRouter);

module.exports = apiRouter;
