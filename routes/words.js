const wordsRouter = require('express').Router();
const { getAllWords, addWord, deleteWord } = require('../controllers/words');

const { handles405s } = require('../errors/index');

wordsRouter.route('/').get(getAllWords).post(addWord).all(handles405s);

wordsRouter.route('/:wordId').delete(deleteWord).all(handles405s);

module.exports = wordsRouter;
