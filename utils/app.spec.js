const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const { expect } = require('chai');
const connection = require('../db/connection');

describe('/api', () => {
  after(() => connection.destroy());
  describe('/words', () => {
    describe('GET', () => {
      it('returns all words', () => {
        return request(app)
          .get('/api/words')
          .expect(200)
          .then(({ body: { words } }) => {
            expect(words).to.be.an('array');
            expect(words).to.have.lengthOf(4);
          });
      });
    });
    describe('POST', () => {
      it('status 201: returns word object with new word', () => {
        return request(app)
          .post('/api/words')
          .send({ word: 'trainers' })
          .expect(201)
          .then(({ body: { word } }) => {
            expect(word).to.eql({ word_id: 5, word: 'trainers' });
          });
      });
      it('status 400: returns Bad Request when word is empty string', () => {
        return request(app)
          .post('/api/words')
          .send({ word: '' })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Apologies! Unprocessable entity');
          });
      });
    });
  });
});
