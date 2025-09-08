const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ver = process.env.APP_VERSION || 'dev';

app.get('/', (req, res) => {
  res.send(`Hello DevOps World — version: ${ver}\n`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
