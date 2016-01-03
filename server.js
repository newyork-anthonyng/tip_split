'use strict'

const express = require('express');
const app     = express();

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.json({ SUCCESS: true });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server running.');
});
