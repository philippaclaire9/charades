const knex = require('knex');

const dbConfig = require('../knexfile'); //dbConfig details which database we are using,
// where the seed file is and the ENV

const connection = knex(dbConfig);

module.exports = connection;
