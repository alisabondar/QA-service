require('dotenv').config();
const request = require('supertest');
const db = require('../db');
const models = require('./database/dbModels');

describe('Database Testing', () => {

  // id 685 body =
  queData = 'Deleniti quia quidem saepe ut ut cupiditate sed quibusdam.';
  // id 6879301 email =
  ansData = 'Trinity37@hotmail.com';
  // id 1146728 url =
  photoData = 'https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'

  it ('Data in database should match the corresponding csv file', async () => {
    let queQuery = 'SELECT q_body FROM questions WHERE q_id = 685';
    let ansQuery = 'SELECT a_email FROM answers WHERE a_id = 6879301';
    let photosQuery = 'SELECT photo FROM photos WHERE id = 1146728'

    const client = await db.connect();

    try {
      const queResult = await client.query(queQuery);
      const ansResult = await client.query(ansQuery);
      const photosResult = await client.query(photosQuery);

      expect(queResult.rows[0].q_body).toEqual(queData);
      expect(ansResult.rows[0].a_email).toEqual(ansData);
      expect(photosResult.rows[0].photo).toEqual(photoData);
    } finally {
      client.release();
    }
  })

  describe('API Testing', () => {

    it ('Should fetch correct questions based on product ID', () => {
      const id = 12345;

      request(`http://${process.env.PGHOST}:${process.env.PGPORT}`)
        .get(`qa/questions/?product_id=${id}`)
        .expect(200);
        .end((err, res) => {
          if (err) {
            throw err;
          }
        })
    })

  })

});

// xdescribe('API Testing', () => {
//   it('Should fetch correct reviews data based on product ID', () => {

//     request(`${process.env.API_URL}`)
//       .get('/reviews/?product_id=37312')
//       .expect(200)
//       .expect(res => {
//         assert(res.body.results, expectedData);
//       })
//       .set('Authorization', `${process.env.TOKEN}`)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//       });
//   });
