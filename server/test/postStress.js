import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      preAllocatedVUs: 10,
      rate: 10,
      timeUnit: '1s',
    },
    scenario2: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      preAllocatedVUs: 50,
      rate: 50,
      timeUnit: '1s',
    },
    scenario3: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      preAllocatedVUs: 100,
      rate: 100,
      timeUnit: '1s',
    },
    scenario4: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      preAllocatedVUs: 1000,
      rate: 1000,
      timeUnit: '1s',
    }
  },
};

export default function () {
  const payload = JSON.stringify({
    body: 'this is a question',
    name: 'akb',
    email: 'anon123@gmail.com'
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('http://localhost:3000/qa/questions/3518958', payload, { headers });

  check(res, {'Post status is 201': (r) => res.status === 201});
}