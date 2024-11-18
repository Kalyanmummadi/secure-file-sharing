const request = require('supertest');
const app = require('../app');

describe('Client User Tests', () => {
  it('should sign up a client successfully', async () => {
    const res = await request(app)
      .post('/api/client/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Verification email sent');
  });
});

