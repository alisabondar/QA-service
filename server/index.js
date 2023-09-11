const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const connect = require('./database/dbConnect');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

connect();

app.use('/', routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:3000`);
  }
});