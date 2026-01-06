const http = require('http');
const express = require('express');
const app = express();
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(`Echo: ${message}`);
    });
    ws.send('Welcome to the WebSocket server!');
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
app.get('/', (req, res) => {
    res.send('Hello, WebSocket World!');
});
server.listen(3000, () => {
    console.log('HTTP server is running on http://localhost:3000');
    console.log('WebSocket server is running on ws://localhost:3000/ws');
});
