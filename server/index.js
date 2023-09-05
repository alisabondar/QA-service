const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

const { exec } = require('child_process');
const connect = require('./database/dbConnect');
const routes = require('./routes');

const app = express();
const shell = path.join(__dirname, 'database/psql_create.sh');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

exec(`bash ${shell}`, (err, stdout, stderr) => {
  if (err) {
    console.error('Cannot execute bash script', err);
  }
  console.log(stdout);
  connect();
})

// API Calls
app.use('/', routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Listening at http://localhost:3000`);
  }
});