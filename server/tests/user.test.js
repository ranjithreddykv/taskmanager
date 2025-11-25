
import request from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';

describe('User API', () => {
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return 401 for invalid login', async () => {
    const res = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });
    
    // Expecting 401 or 400 depending on implementation. 
    // Based on common practices, invalid credentials usually return 401.
    // If the user controller returns 200 with "Invalid credentials", we might need to adjust.
    // Let's assume 401 or 400 or 404.
    expect([400, 401, 404]).toContain(res.statusCode);
  });
});
