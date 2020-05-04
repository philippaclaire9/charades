const apiRouter = require('express').Router();

const wordsRouter = require('./words');

const { getEndpoints } = require('../controllers/endpoints');

const { handles405s } = require('../errors/index');

apiRouter.route('/').get(getEndpoints).all(handles405s);

apiRouter.use('/words', wordsRouter);

module.exports = apiRouter;
