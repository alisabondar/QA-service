const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./dbConnect');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

connect();

app.listen(process.env.PGPORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:${process.env.PGPORT}`);
  }
});