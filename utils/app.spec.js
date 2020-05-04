const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const { expect } = require('chai');
const connection = require('../db/connection');

describe('/api', () => {
  after(() => connection.destroy());

  describe('INVALID METHODS', () => {
    it('status 405: invalid method', () => {
      const invalidMethods = ['put', 'patch', 'delete'];
      const promiseArray = invalidMethods.map((method) => {
        return request(app)
          [method]('/api')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Sorry, method not allowed!');
          });
      });
      return Promise.all(promiseArray);
    });
  });
  describe('GET', () => {
    it('status 200: returns a json object of all possible endpoints', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).to.be.an('object');
        });
    });
    it('status 404: returns not found when incorrect path is used', () => {
      return request(app)
        .get('/apii')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('Sorry, path not found!');
        });
    });
  });
  describe('/words', () => {
    describe('INVALID METHODS', () => {
      it('status 405: invalid method', () => {
        const invalidMethods = ['put', 'patch', 'delete'];
        const promiseArray = invalidMethods.map((method) => {
          return request(app)
            [method]('/api/words')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Sorry, method not allowed!');
            });
        });
        return Promise.all(promiseArray);
      });
    });
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
      // it('status 422: returns unprocessable entity when word is empty string', () => {
      //   return request(app)
      //     .post('/api/words')
      //     .send({ word: '' })
      //     .expect(422)
      //     .then(({ body: { msg } }) => {
      //       expect(msg).to.equal('Apologies! Unprocessable entity');
      //     });
      // });
    });
    describe('/word_id', () => {
      describe('INVALID METHODS', () => {
        it('status 405: invalid method', () => {
          const invalidMethods = ['post', 'get', 'put', 'patch'];
          const promiseArray = invalidMethods.map((method) => {
            return request(app)
              [method]('/api/words/1')
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Sorry, method not allowed!');
              });
          });
          return Promise.all(promiseArray);
        });
      });
      describe('DELETE', () => {
        it('status 204: deletes comment by comment_id and returns no content', () => {
          return request(app).delete('/api/words/1').expect(204);
        });
        it('status 404: returns not found when trying to delete a comment that has already been deleted', () => {
          return request(app)
            .delete('/api/words/1')
            .then(() => {
              return request(app)
                .delete('/api/words/1')
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Sorry, not found!');
                });
            });
        });
        it('status 404: returns not found when word_id is valid but non-existent', () => {
          return request(app)
            .delete('/api/words/1000')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Sorry, not found!');
            });
        });
        it('status 400: returns Bad Request when word_id does not exist', () => {
          return request(app)
            .delete('/api/words/oranges')
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Sorry, bad request!');
            });
        });
      });
    });
  });
});
