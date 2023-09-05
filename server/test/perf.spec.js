const request = require('supertest');
const models = require('../database/dbModels')

describe('Performance Measurements', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Performance time for fetching questions', () => {
    const mockReq = { params: { product_id: 67 } }; // Create a mock request object
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(() => mockRes)
    };

    const startTime = new Date();
    jest.setSystemTime(startTime);

    return models.fetchQue(mockReq, mockRes)
      .then(() => {
        const endTime = new Date();
        jest.setSystemTime(endTime);

        const elapsedTime = endTime - startTime;
        console.log('Elapsed Time:', elapsedTime, 'milliseconds');
        // expect(elapsedTime).toBeLessThan(50);
      })
      .catch(err => console.error('Error:', err))
      .then(() => Promise.resolve());
  });

});