const db = require('./db');

const fetchQue = async (req, res) => {
  const id = req.params.product_id;
  const client = await db.connect();

  await client.query(`SELECT * FROM questions WHERE q_id = $1`, [id], (err, result) => {
    if (err) {
      console.error('Cannot fetch questions', err)
    }
    res.status(200).json(result.rows)
  });
}

const fetchAns = (req, res) => {

}

module.exports = {
  fetchQue,
  fetchAns
}