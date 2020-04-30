const ENV = process.env.NODE_ENV || 'test';
const testData = require('./test-data'); //automatically looks for index.js
//const devData = require("./dev-data"); //automatically looks for index.js

const data = {
  //development: devData,
  test: testData,
};

module.exports = data[ENV];
