const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const db = require('./database/db');
const connect = require('./database/dbConnect');
const models = require('./database/dbModels');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

connect();

// API Calls
app.get('/qa/questions/:product_id', models.fetchQue);
app.get('/qa/questions/:question_id/answers', models.fetchAns);
// app.post('/qa/questions/:product_id', models.postQue);
// app.post('/qa/questions/:question_id/answers', models.postAns);
app.put('/qa/questions/:question_id/helpful', models.helpQue);
app.put('/qa/questions/:question_id/report', models.repQue);
app.put('/qa/answers/:answer_id/helpful', models.helpAns);
app.put('/qa/answers/:answer_id/report', models.repAns);


app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:3000`);
  }
});