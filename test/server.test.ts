import request from 'supertest';
import server from '../src/server';
import DoneCallback = jest.DoneCallback;

afterAll((done: DoneCallback): void => {
  server.close(() => {
    done();
  });
});

describe('GET /', (): void => {
  it('response with no Bearer fails!', async (): Promise<void> => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('{"error":{"statusCode":401,"message":"Unauthorized"}}');
  });
});
