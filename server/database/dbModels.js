const db = require('./db');

const fetchQue = (req, res) => {
  const id = req.params.product_id;
  // need to filter for q_report to be 0

  db.connect()
    .then(client => {
      client
        .query(`SELECT * FROM questions WHERE product_id = $1`, [id])
        .then(result => res.status(200).json(result.rows))
        .catch(err => res.status(500).send('Cannot fetch questions'))
        .finally(() => client.release());
    })
    .catch(err => res.status(500).send('Database connection error'));
}

const fetchAns = (req, res) => {
  const id = req.params.question_id;
  // need to filter for a_report to be 0

  db.connect()
    .then(client => {
      client
        .query(`SELECT * FROM answers WHERE q_id = $1`, [id])
        .then(result => res.status(200).json(result.rows))
        .catch(err => res.status(500).send('Cannot fetch questions'))
        .finally(() => client.release());
    })
    .catch(err => res.status(500).send('Database connection error'));
}

const postQue = (req, res) => {
  const id = req.params.product_id;
  const data = req.body;
  // has to be epoch format
  const current = new Date();
  const date = current.toLocaleString();

  db.connect()
    .then(client => {
      client
        .query(`INSERT INTO questions (product_id, q_body, q_date, q_name, q_email) VALUES ($1, $2, $3, $4, $5)`, [id, data.body, date, data.name, data.email])
        .then(() => res.status(201).send('Question posted successfully'))
        .catch(err => {
          console.error('Error inserting question:', err);
          res.status(500).send('Cannot post question');
        })
        .finally(() => client.release());
    })
    .catch(err => res.status(500).send('Database connection error'));
}

const postPhotos = (id, array) => {
  console.log(Array.isArray(array));
  const queries = array.map(url => ({
    text: 'INSERT INTO photos (a_id, photo) VALUES ($1, $2)',
    values: [id, url]
  }));
  return queries;
};

const postAns = (req, res) => {
  const id = req.params.question_id;
  const data = req.body;
  const current = new Date();
  const date = current.toLocaleString();
  console.log(data.photos)
  const photoQueries = postPhotos(id, data.photos);

  db.connect()
    .then(async (client) => {
      try {
        await client.query('BEGIN');
        await client.query('INSERT INTO answers (q_id, a_body, a_date, a_name, a_email) VALUES ($1, $2, $3, $4, $5)',
        [id, data.body, date, data.name, data.email]);

        for (const query of photoQueries) {
          await client.query(query);
        }
        res.status(201).send('Answer posted successfully');
      } catch (err) {
        res.status(500).send('Cannot post answer');
      } finally {
        client.release();
      }
    })
    .catch(err => res.status(500).send('Database connection error'));
}

const helpQue = (req, res) => {
  const id = req.params.question_id;

  db.connect()
    .then(client => {
      client
        .query('SELECT q_helpful FROM questions WHERE q_id = $1', [id])
        .then(result => {
          if (result.rows.length > 0) {
            const prev = result.rows[0].q_helpful;
            const helpful = prev + 1;

            client
              .query('UPDATE questions SET q_helpful = $1 WHERE q_id = $2', [helpful, id])
              .then(() => res.status(204).send('Database updated successfully'))
              .catch(err => res.status(500).send('Cannot update database'))
              .finally(() => client.release());
          } else {
            res.status(404).send('Question not found');
          }
        })
        .catch(err => res.status(500).send('Cannot query database'))
    })
    .catch(err => res.status(500).send('Database connection error'));
}

const repQue = (req, res) => {
  const id = req.params.question_id;

  db.connect()
    .then(client => {
      client
        .query('SELECT q_report FROM questions WHERE q_id = $1', [id])
        .then(result => {
          if (result.rows.length > 0) {
            const prev = result.rows[0].q_report;
            const report = prev + 1;

            client
              .query('UPDATE questions SET q_report = $1 WHERE q_id = $2', [report, id])
              .then(() => res.status(204).send('Database updated successfully'))
              .catch(err => res.status(500).send('Cannot update database'))
              .finally(() => client.release());
          } else {
            res.status(404).send('Question not found');
          }
        })
        .catch(err => res.status(500).send('Cannot query database'))
    })
    .catch(err => res.status(500).send('Database connection error'));
}

const helpAns = (req, res) => {
  const id = req.params.answer_id;

  db.connect()
    .then(client => {
      client
        .query('SELECT a_helpful FROM answers WHERE a_id = $1', [id])
        .then(result => {
          if (result.rows.length > 0) {
            const prev = result.rows[0].a_helpful;
            const helpful = prev + 1;

            client
              .query('UPDATE answers SET a_helpful = $1 WHERE a_id = $2', [helpful, id])
              .then(() => res.status(204).send('Database updated successfully'))
              .catch(err => res.status(500).send('Cannot update database'))
              .finally(() => client.release());
          } else {
            res.status(404).send('Question not found');
          }
        })
        .catch(err => res.status(500).send('Cannot query database'))
    })
    .catch(err => res.status(500).send('Database connection error'));
}

const repAns = (req, res) => {
  const id = req.params.answer_id;

  db.connect()
    .then(client => {
      client
        .query('SELECT a_report FROM answers WHERE a_id = $1', [id])
        .then(result => {
          if (result.rows.length > 0) {
            const prev = result.rows[0].a_report;
            const report = prev + 1;

            client
              .query('UPDATE answers SET a_report = $1 WHERE a_id = $2', [report, id])
              .then(() => res.status(204).send('Database updated successfully'))
              .catch(err => res.status(500).send('Cannot update database'))
              .finally(() => client.release());
          } else {
            res.status(404).send('Question not found');
          }
        })
        .catch(err => res.status(500).send('Cannot query database'))
    })
    .catch(err => res.status(500).send('Database connection error'));
}

module.exports = {
  fetchQue,
  fetchAns,
  postQue,
  postAns,
  helpQue,
  repQue,
  helpAns,
  repAns
}