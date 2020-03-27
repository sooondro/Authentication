const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');
const users = require('./auth.model');
// const db = require('../db/connection');

// const users = db.get('users');

const newUser = {
  username: 'testuser',
  password: '12345678',
};

describe('GET /auth', () => {
  it('should respond with a message', async () => {
    const response = request(app)
      .get('/auth')
      .expect(200);
    expect((await response).body.message).to.equal('Auth router is working');
  });
});

describe('POST /auth/signup', () => {
  before(async () => {
    await users.remove({});
  });

  it('should require a username', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({})
      .expect(422);
    expect(response.body.message).to.equal('child "username" fails because ["username" is required]');
  });
  it('should require a password', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ username: 'testUser' })
      .expect(422);
    expect(response.body.message).to.equal('child "password" fails because ["password" is required]');
  });
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(200);
    expect(response.body).to.have.property('token');
  });
  it('should not allow a user with an existing username', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(409);
    expect(response.body.message).to.equal('Username already exists. Please choose another one.');
  });
});

describe('POST /auth/login', () => {
  it('should require a username', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({})
      .expect(422);
    expect(response.body.message).to.equal('Unable to login.');
  });
  it('should require a password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testUser' })
      .expect(422);
    expect(response.body.message).to.equal('Unable to login.');
  });
  it('should not allow invalid users to login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testtest' })
      .expect(422);
    expect(response.body.message).to.equal('Unable to login.');
  });
  it('should only allow valid users to login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(newUser)
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});
