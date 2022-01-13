const express = require('express');

const app = express();

app.use('/admin', (req, res, next) => {
  console.log("Triggered the admin page");
  res.send('<h1>Admin Page</h1>');
});

app.use('/', (req, res, next) => {
  console.log("Triggered home middleware");
  res.send('<h1>Home Page</h1>');
});


app.listen(3000);