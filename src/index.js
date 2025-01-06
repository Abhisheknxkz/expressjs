const express = require(`express`)

const app = express()
app.use(express.json())
app.use(express.text())

// String array
const stringArray = ["Saab", "Volvo", "BMW"];

// Object array
const objectArray = [
    {
      color: "purple",
      type: "minivan",
      registration: new Date('2017-01-03'),
      capacity: 7
    },
    {
      color: "red",
      type: "station wagon",
      registration: new Date('2018-03-03'),
      capacity: 5
    },
  ];

// Number array
const numberArray = [40, 100, 1, 5, 25, 10];

// GET requests
app.get('/api/strings', (req, res) => {

    res.json(stringArray);

    res.end();
});

app.get('/api/objects', (req, res) => {

    res.json(objectArray);
    
    res.end();
});

app.get('/api/numbers', (req, res) => {

    res.json(numberArray);
    
    res.end();
});

// POST requests
app.post('/api/json', (req, res) => {

    const body = req.body;

    if (typeof body !== 'object' || !body)
    {
        res.status(400).write("body must be JSON format");
    }
    else
    {
        console.log(body);
    }


    res.end();
});

app.post('/api/string', (req, res) => {

    const body = req.body;

    if (typeof body != 'string' || !body)
    {
        res.status(400).write("body must be string format");
    }
    else
    {
        console.log(body);
    }
    
    res.end();
});

app.post('/api/header', (req, res) => {

    const header = req.headers;
    const body = req.body;

    if (header.somekey !== "secret")
    {
        res.status(404).write("wrong key");
    }
    else
    {
        console.log(body);    
        console.log(header);
    }
    
    res.end();
});

app.put('/api/:id/:firstname', (req, res) => {

    const body = req.body;
    const id = req.params.id;
    const name = req.params.firstname;

    res.json({
        id,
        name,
        body
    });

    res.end();
});

app.delete('/api/delete/:id', (req, res) => {

    const id = req.params.id;
    
    const data = [
        {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
            "hide": false
          },
          {
            "postId": 1,
            "id": 2,
            "name": "quo vero reiciendis velit similique earum",
            "email": "Jayne_Kuhic@sydney.com",
            "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
            "hide": false
          },
          {
            "postId": 1,
            "id": 3,
            "name": "odio adipisci rerum aut animi",
            "email": "Nikita@garfield.biz",
            "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
            "hide": false
          },
        ];

    const valueDelete = data.filter( (ids) => {
        if (ids.id === parseInt(id))
            ids.hide = true;
        return ids;
    });

    res.json(valueDelete);

    res.end();    
});

app.listen(3000, () => {console.log("APi is working on port 3000")})