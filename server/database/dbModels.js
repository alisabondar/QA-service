const db = require('./db');

const fetchQue = (req, res) => {
  const id = req.params.product_id;
  const query = `
      SELECT jsonb_agg(
        jsonb_build_object(
          'question_id', q.q_id,
          'question_body', q.q_body,
          'question_date', q.q_date,
          'asker_name', q.q_name,
          'question_helpfulness', q.q_helpful,
          'reported', q.q_report,
          'answers', (
            SELECT (
              SELECT jsonb_object_agg(
                a.a_id,
                ( SELECT jsonb_build_object(
                  'id', a.a_id,
                  'body', a.a_body,
                  'date', a.a_date,
                  'answerer_name', a.a_name,
                  'helpfulness', a.a_helpful,
                  'photos', (
                    SELECT array_agg(jsonb_build_object(
                      'id', p.a_id,
                      'url', p.photo
                    ))
                  FROM photos p
                  WHERE p.a_id = a.a_id
                )))
                ORDER BY a.a_id
              ))
            FROM answers a
            WHERE a.q_id = q.q_id AND a_report = 0
          ))
          ORDER BY q.q_id
        )
  FROM questions q
  WHERE q.product_id = $1::integer AND q_report = 0
  GROUP BY q.product_id;`;

  db.connect()
    .then(client => {
      client
        .query(query, [id])
        .then(result => {
          const product = { product_id: id, results: result.rows[0].jsonb_agg };
          res.status(200).json(product);
        })
        .catch(err => res.status(500).send('Cannot fetch questions'))
        .finally(() => client.release());
    })
    .catch(err => res.status(500).send('Database connection error'));
}


const fetchAns = (req, res) => {
  const id = req.params.question_id
  const page = Number(req.query.page) || 1;
  const count = Number(req.query.count) || 5;
  const offset = (page - 1) * count;

  const query = `
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', a.a_id,
        'body', a.a_body,
        'date', a.a_date,
        'answerer_name', a.a_name,
        'helpfulness', a.a_helpful,
        'photos', (
          SELECT array_agg(jsonb_build_object(
            'id', p.a_id,
            'url', p.photo
          ))
        FROM photos p
        WHERE p.a_id = a.a_id
        ))
      ORDER BY a.a_id
    ) AS answers
    FROM answers a
    WHERE a.q_id = $1 AND a_report = 0
    GROUP BY a.q_id
    ORDER BY a.q_id;`;

  db.connect()
    .then(client => {
      client
        .query(query, [id])
        .then(result => {
          const product = { question: id, page: page, count: count, results: result.rows[0].answers.slice(offset, count + offset) };
          res.status(200).json(product);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send('Cannot fetch answers') })
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