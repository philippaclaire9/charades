const wordsRouter = require('express').Router();
const { getAllWords, addWord } = require('../controllers/words');

wordsRouter.route('/').get(getAllWords).post(addWord);

module.exports = wordsRouter;
