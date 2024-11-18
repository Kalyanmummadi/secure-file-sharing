const request = require('supertest');
const app = require('../app');

describe('Ops User Tests', () => {
  it('should upload a file successfully', async () => {
    const res = await request(app)
      .post('/api/ops/upload')
      .set('Authorization', 'Bearer validToken')
      .attach('file', '__tests__/sample.xlsx');
    expect(res.statusCode).toBe(201);
  });
});
