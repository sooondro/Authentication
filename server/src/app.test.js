const request = require('supertest');
const { expect } = require('chai');

const app = require('./app');

describe('app - GET /', () => {
  it('should respond with a message', async () => {
    const response = request(app)
      .get('/')
      .expect(200);
    expect((await response).body.message).to.equal('Hello World!');
  });
});
