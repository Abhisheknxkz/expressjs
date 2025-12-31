const express = require('express');
const app = express();
app.use(express.text());// Middleware to parse JSON bodies
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post('/data', (req, res) => {
    res.send('Data received via POST request' + JSON.stringify(req.body));
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});