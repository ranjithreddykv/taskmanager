
import request from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';

describe('Task API', () => {
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return 401 when getting tasks without token', async () => {
    const res = await request(app).get('/api/v1/task');
    expect(res.statusCode).toEqual(401);
  });
});
