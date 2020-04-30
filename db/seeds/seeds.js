const { wordData } = require('../data/index');

exports.seed = (knex) => {
  return knex.insert(wordData, ['*']).into('words').returning('*');
};
