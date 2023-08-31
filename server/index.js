const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const connect = require('./dbConnect');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

connect();

// API Calls
// convert date to datetime using cast command

app.get('/qa/questions/:product_id', (req, res) => {
  const id = req.params.product_id;

})

// app.get('/qa/questions/:question_id/answers', (req, res) => {
//   // confirm params
//   const id = req.params.question_id;

// })

// app.post('/qa/questions', (req, res) => {
//   // confirm data
//   const data = req.body;

// })

// app.post('/qa/questions/:question_id/answers', (req, res) => {
//   // confirm params
//   const id = req.params.question_id;

// })

// app.put('/qa/questions/:question_id/helpful', (req, res) => {
//   const id = req.params.question_id;

// })

// app.put('/qa/questions/:question_id/report', (req, res) => {
//   const id = req.params.question_id;

// })

// app.put('/qa/answers/:answer_id/helpful', (req, res) => {
//   const id = req.params.answer_id;

// })

// app.put('/qa/answers/:answer_id/report', (req, res) => {
//   const id = req.params.answer_id;

// })

app.listen(process.env.PGPORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:${process.env.PGPORT}`);
  }
});