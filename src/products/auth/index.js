const jwt = require('jsonwebtoken');
const express = require('express');
const { validateToken } = require('./helper');
const app = express();

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

app.listen(4000, ()=> {
    console.log('listening on port 4000');
})
