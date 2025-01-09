const jwt = require('jsonwebtoken');
const express = require('express');
const { validateToken } = require('./helper');
const app = express();

app.use(express.json())

const message = {
    text: 'Hi! How are you ?',
    token: 'sxncdjakfbw3hr8923ewjdfnosjkflb3uweklaDH32l'
},protected = {
    text: "Your route to /protected api"
},user = {
    id: 'daniella123',
    password: 'psswrd098'
}

app.get('/api/security', (req, res) => {
    res.status(200).json(message);
    // res.status(200).end('Route /api/security/home ends here');
});

app.post('/api/security/tokens', (req, res) => {
    const token = jwt.sign({user}, 'my_secret_key1234', {expiresIn: "1h"});
    res.status(201).json({token}).end();
});

//(route, middleware, callback)
app.get('/daniella-account-access', validateToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key1234', (err, data) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({protected, data})
        }
    })
})

// Learning I think this is a best way 
const SECRET_KEY = 'my_secret_key';

const users = [
    { 
        id: 1, 
        username: 'testuser', 
        password: 'testpassword' 
    } 
];

app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
        return res.status(403).send('user or pass is wrong');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/protected', validateToken, (req, res) => {
    res.send('protected message');
});

app.listen(4000, ()=> {
    console.log('listening on port 4000');
})
