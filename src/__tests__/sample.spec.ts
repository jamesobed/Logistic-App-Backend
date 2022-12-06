require('dotenv').config();
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;

import request from 'supertest';
import app from '../app';
import db from '../config/dbConfig';

beforeAll(async () => {
  try {
    await db.sync({ force: true });
  } catch (err) {
    console.error(err);
  }
});

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
