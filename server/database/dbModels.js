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
        .then(result => {
          console.log('results!', result.rows);
          res.status(200).json(result.rows);
        })
        .catch(err => res.status(500).send('Cannot fetch questions'))
        .finally(() => client.release());
    })
    .catch(err => res.status(500).send('Database connection error'));
}

module.exports = {
  fetchQue,
  fetchAns
}