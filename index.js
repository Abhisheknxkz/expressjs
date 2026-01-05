const express = require('express');
const app = express();
const userData = { name: "John Doe", id: 123, email: "john.doe@example.com" };
app.use(express.text());// Middleware to parse text bodies
app.use(express.json());// Middleware to parse JSON bodies
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post('/data', (req, res) => {
    res.send('Data received via POST request' + JSON.stringify(req.body));
});
app.patch('/data/:id', (req, res) => {
  if(parseInt(req.params.id) === userData.id){
    userData.email = req.body.email;
  }else{
    return res.json(userData)
  }
  res.send(`Data with ID ${req.params.id} updated via PUT request` + JSON.stringify(userData));
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});