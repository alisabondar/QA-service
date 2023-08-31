const request = require('supertest');
const db = require('../db');


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

});

// xdescribe('API Testing', () => {
//   it('Should fetch correct reviews data based on product ID', () => {
//     const expectedData = [
//       {
//         'review_id': 1280180,
//         'rating': 5,
//         'summary': 'squidward test review',
//         'recommend': true,
//         'response': null,
//         'body': 'just a test haha',
//         'date': '2023-06-26T00:00:00.000Z',
//         'reviewer_name': 'squid',
//         'helpfulness': 29,
//         'photos': [
//           {
//             'id': 2459025,
//             'url': 'https://static.wikia.nocookie.net/spongebob/images/4/4f/The_Two_Faces_of_Squidward_075.png'
//           },
//           {
//             'id': 2459026,
//             'url': 'https://static.wikia.nocookie.net/spongebob/images/9/96/The_Two_Faces_of_Squidward_174.png'
//           }
//         ]
//       },
//       {
//         'review_id': 1135534,
//         'rating': 2,
//         'summary': 'is this working??',
//         'recommend': true,
//         'response': null,
//         'body': 'test 111111',
//         'date': '2022-02-11T00:00:00.000Z',
//         'reviewer_name': 'oliver6666',
//         'helpfulness': 17,
//         'photos': []
//       },
//       {
//         'review_id': 1135535,
//         'rating': 2,
//         'summary': 'is this working??',
//         'recommend': true,
//         'response': null,
//         'body': 'test 111111',
//         'date': '2022-02-11T00:00:00.000Z',
//         'reviewer_name': 'oliver7777',
//         'helpfulness': 4,
//         'photos': []
//       },
//       {
//         'review_id': 1280179,
//         'rating': 5,
//         'summary': 'squidward test review',
//         'recommend': true,
//         'response': null,
//         'body': 'just a test haha',
//         'date': '2023-06-26T00:00:00.000Z',
//         'reviewer_name': 'squid',
//         'helpfulness': 2,
//         'photos': [
//           {
//             'id': 2459023,
//             'url': 'https://static.wikia.nocookie.net/spongebob/images/9/96/The_Two_Faces_of_Squidward_174.png'
//           },
//           {
//             'id': 2459024,
//             'url': 'https://static.wikia.nocookie.net/spongebob/images/4/4f/The_Two_Faces_of_Squidward_075.png'
//           }
//         ]
//       },
//       {
//         'review_id': 1275436,
//         'rating': 5,
//         'summary': 'Chester B Arthur',
//         'recommend': true,
//         'response': null,
//         'body': ' let boom = characteristicCreater(); let boom = characteristicCreater();',
//         'date': '2022-07-15T00:00:00.000Z',
//         'reviewer_name': 'johnbarleycorn',
//         'helpfulness': 0,
//         'photos': []
//       }
//     ];

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

//   it('Should fetch correct meta data based on product ID', () => {
//     const expectedMetaData = {
//       'product_id': '37312',
//       'ratings': {
//         '1': '19',
//         '2': '13',
//         '3': '9',
//         '4': '6',
//         '5': '13'
//       },
//       'recommended': {
//         'false': '11',
//         'true': '49'
//       },
//       'characteristics': {
//         'Quality': {
//           'id': 125035,
//           'value': '3.2068965517241379'
//         }
//       }
//     };

//     request(`${process.env.API_URL}`)
//       .get('/reviews/meta/?product_id=37312')
//       .expect(200)
//       .expect(res => {
//         assert(res.body.results, expectedMetaData);
//       })
//       .set('Authorization', `${process.env.TOKEN}`)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//       });
//   });

//   it('Should include a successful put request', () => {
//     request(`${process.env.API_URL}`)
//       .put('/reviews/1280179/helpful')
//       .expect(204)
//       .set('Authorization', `${process.env.TOKEN}`)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//       });
//   });

// });


