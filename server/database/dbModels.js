const db = require('./db');

const fetchQue = (req, res) => {
  const id = req.params.product_id;

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
  // const id = req.params.product_id;
  // const data = req.body;

  // db.connect()
  //   .then(client => {
  //     client
  //       .query(``, [id]) // body?
  //       .then(result => res.status(201))
  //       .catch(err => res.status(500).send('Cannot post question'))
  //       .finally(() => client.release());
  //   })
  //   .catch(err => res.status(500).send('Database connection error'));
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