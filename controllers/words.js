const { fetchAllWords, insertWord, removeWord } = require('../models/words');

exports.getAllWords = (req, res, next) => {
  fetchAllWords()
    .then((words) => {
      res.status(200).send({ words });
    })
    .catch(next);
};

exports.addWord = (req, res, next) => {
  insertWord(req.body)
    .then((word) => {
      res.status(201).send({ word });
    })
    .catch(next);
};

exports.deleteWord = (req, res, next) => {
  const { wordId } = req.params;
  // console.log(wordId, '<<<<<<<');
  removeWord(wordId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
