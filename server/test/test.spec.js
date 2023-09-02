const request = require('supertest');
const express = require('express');
const server = require('../index');
const routes = require('../routes');

// add one more test for postPhotos
describe('API Tests', () => {
  it('Should return 200 when fetching questions', async () => {
    const expressApp = express();
    expressApp.use('/', routes);

    const response = await request(expressApp).get('/qa/questions/123');
    expect(response.status).toBe(200);
  });

  it('Should return 200 when fetching answers', async () => {
    const expressApp = express();
    expressApp.use('/', routes);

    const response = await request(expressApp).get('/qa/questions/123/answers');
    expect(response.status).toBe(200);
  });

  const mockQue = {
    body: 'hello - great quality - great price - 10/10 recommend',
    name: 'anon123',
    email: 'abc123@gmail.com'
  };

  const mockAns = {
    body: 'Is this worth the price for the quality?',
    name: 'anon123',
    email: 'abc123@gmail.com',
    photos: ['https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80', 'https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80']
  }

  xit('Should return 201 when posting a question', async () => {
    const expressApp = express();
    expressApp.use('/', routes);

    const response = await request(expressApp)
      .post('/qa/questions/5')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(mockQue))
    expect(response.status).toBe(201);
  });

  xit('Should return 201 when posting an answer', async () => {
    const expressApp = express();
    expressApp.use('/', routes);

    const response = await request(expressApp)
      .post('/qa/questions/5/answers')
      .send(mockAns);
    expect(response.status).toBe(201);
  });

  it('Should return 204 when modifying helpful', async () => {
    const expressApp = express();
    expressApp.use('/', routes);

    const response = await request(expressApp).put('/qa/questions/2100/helpful');
    expect(response.status).toBe(204);
  });

  it('Should return 204 when modifying report', async () => {
    const expressApp = express();
    expressApp.use('/', routes);

    const response = await request(expressApp).put('/qa/answers/4100/report');
    expect(response.status).toBe(204);
  });
}, 10000);

