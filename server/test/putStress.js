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
  const res = http.put('http://localhost:3000/qa/questions/3518958/helpful');
  check(res, {'Put status is 204': (r) => res.status === 204});
}