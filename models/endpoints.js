const endpoints = require('../endpoints');

exports.fetchEndpoints = () => {
  return Promise.resolve(endpoints);
};
