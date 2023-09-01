require('dotenv').config();
const request = require('supertest');
const db = require('../database/db');
const models = require('../database/dbModels');

describe('Database Testing', () => {

  queData = 'Deleniti quia quidem saepe ut ut cupiditate sed quibusdam.';
  ansData = 'Trinity37@hotmail.com';
  photoData = 'https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'

  it ('Data in database should match the corresponding csv file', () => {
    const queQuery = 'SELECT q_body FROM questions WHERE q_id = 685';
    const ansQuery = 'SELECT a_email FROM answers WHERE a_id = 6879301';
    const photosQuery = 'SELECT photo FROM photos WHERE id = 1146728'

    db.connect()
      .then(client => {
        client.query(queQuery)
        .then(() => expect(queResult.rows[0].q_body).toEqual(queData))
        .then(() => client.query(ansQuery))
        .then(() => expect(ansResult.rows[0].a_email).toEqual(ansData))
        .then(() => client.query(photosQuery))
        .then(() => expect(photosResult.rows[0].photo).toEqual(photoData))
        .catch(err => console.error('Cannot query database', err))
        .finally(() => client.release());
      })
      .catch(err => console.error('Cannot connect to database', err))

    // try {
    //   const queResult = await client.query(queQuery);
    //   const ansResult = await client.query(ansQuery);
    //   const photosResult = await client.query(photosQuery);

    //   expect(queResult.rows[0].q_body).toEqual(queData);
    //   expect(ansResult.rows[0].a_email).toEqual(ansData);
    //   expect(photosResult.rows[0].photo).toEqual(photoData);
    // } finally {
    //   client.release();
    // }
  })

  describe('API Testing', () => {

    productData = [{"q_id":31,"product_id":4,"q_body":"Where is this product made?","q_date":"2021-03-24T17:58:22.000Z","q_name":"cleopatra","q_email":"first.last@gmail.com","q_reported":0,"q_helpfulness":2},
    {"q_id":32,"product_id":4,"q_body":"What fabric is the bottom made of?","q_date":"2020-10-14T23:26:57.000Z","q_name":"iluvcatz","q_email":"first.last@gmail.com","q_reported":0,"q_helpfulness":7},
    {"q_id":33,"product_id":4,"q_body":"Why is this product cheaper here than other sites?","q_date":"2020-06-04T18:29:30.000Z","q_name":"toofast","q_email":"first.last@gmail.com","q_reported":0,"q_helpfulness":4}];

    ansData = [{"a_id":679,"q_id":350,"a_body":"Iusto non occaecati aut fuga.","a_date":"2020-09-11T07:21:44.000Z","a_name":"Stephen53","a_email":"Aileen.Erdman@yahoo.com","a_reported":0,"a_helpfulness":14},
    {"a_id":680,"q_id":350,"a_body":"Nulla voluptatem similique accusamus soluta.","a_date":"2020-11-30T02:33:18.000Z","a_name":"Josephine96","a_email":"Skylar70@gmail.com","a_reported":0,"a_helpfulness":2}]

    it ('Should fetch correct questions based on product ID', () => {
      const product_id = 4;

      request(`http://${process.env.PGHOST}:${process.env.PGPORT}`)
        .get(`/qa/questions/${product_id}`)
        .expect(200)
        .expect(res => {
          expect(res.body[0].product_id).to.be.equal(productData[0].product_id);
          expect(res.body[0].q_date).to.be.equal(productData[0].q_date)
          expect(res.body[1].q_body).to.be.equal(productData[1].q_body);
          expect(res.body[1].q_email).to.be.equal(productData[1].q_email);
          expect(res.body[2].q_helpfulness).to.be.equal(productData[2].q_helpfulness);
        })
        .end((err) => {
          if (err) {
            throw err;
          }
        })
    });

    it ('Should fetch correct answers based on question ID', () => {
      const q_id = 350;

      request(`http://${process.env.PGHOST}:${process.env.PGPORT}`)
        .get(`/qa/questions/${q_id}/answers`)
        .expect(200)
        .expect(res => {
          expect(res.body[0].a_body).to.be.equal(ansData[0].a_body);
          expect(res.body[0].a_date).to.be.equal(ansData[0].a_date)
          expect(res.body[1].a_name).to.be.equal(ansData[1].a_name);
          expect(res.body[1].a_email).to.be.equal(ansData[1].a_email);
        })
        .end((err) => {
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
