/ * eslint no-console: 0 */
const path = require('path');
const express = require('express');
const port = process.env.PORT || 3002;

const app = express();

app.use('/static', express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
