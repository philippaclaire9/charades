const knex = require('../db/connection');

exports.fetchAllWords = () => {
  return knex.select('*').from('words');
};

exports.insertWord = (wordToAdd) => {
  if (wordToAdd.word.length === 0) {
    Promise.reject({ status: 422, msg: 'Apologies! Unprocessable entity' });
  } else {
    return knex
      .insert(wordToAdd)
      .into('words')
      .returning('*')
      .then(([word]) => {
        return word;
        //console.log(word.word);
        //   if (!word.word) {
        //     Promise.reject({ status: 400, msg: 'Apologies! Bad request' });
        //   } else {
        //     return word;
        //   }
      });
  }
};
