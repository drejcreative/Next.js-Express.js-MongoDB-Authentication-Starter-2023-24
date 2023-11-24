import app from '../../../app';
import request from 'supertest';

import {
  dissconnectDB,
  clearDatabaseBeforeTestandConnect,
} from '../../../config/db';

describe('AUTH ENDPOINTS /api/auth/*****', () => {
  beforeAll(async () => {
    await clearDatabaseBeforeTestandConnect();
  });
  afterAll((done) => {
    dissconnectDB(done);
  });

  let signupToken;

  it('POST /signup - should respond with a 200 status code', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'test+2@gmail.com',
      password: 'test1234',
    });
    signupToken = res.body.token;
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.token).toBeDefined();
  });

  it('POST /signup - bad request without bad email should retutn 422 status code', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'test+2@gmail',
      password: 'test1234',
    });
    expect(res.statusCode).toBe(422);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.message).toBeDefined();
  });

  it('POST /activate - should activate user and return 201', async () => {
    const res = await request(app).post('/api/auth/activate').send({
      token: signupToken,
    });
    expect(res.statusCode).toBe(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toBeDefined();
  });

  it('POST /Login - user dont exist should return 404', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test+1@gmail.com',
      password: 'test1234',
    });
    expect(res.statusCode).toBe(404);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.message).toBeDefined();
  });

  it('POST /Login - user exist should return 201', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test+2@gmail.com',
      password: 'test1234',
    });
    expect(res.statusCode).toBe(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toBeDefined();
  });

  it('GET /email/:email - get user by valid email should return 201', async () => {
    const res = await request(app).get('/api/auth/email/test+2@gmail.com');
    expect(res.statusCode).toBe(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toBeDefined();
  });
});
