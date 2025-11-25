
import request from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';

describe('Healthcheck API', () => {
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return 200 and success message', async () => {
    const res = await request(app).post('/api/v1/healthcheck/healthcheck');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Health check complete');
  });
});
