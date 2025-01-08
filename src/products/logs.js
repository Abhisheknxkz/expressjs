const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.post('/txt/create', (req, res) => {
    const data = req.body.data;
    fs.writeFile('data.txt', data, (err) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.status(201).json({ message: 'File created succesfully' });
    });
});

app.get('/txt/read', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.json({ fileData: data });
    });
});

app.put('/txt/update', (req, res) => {
    const newData = req.body.data;
    fs.writeFile('data.txt', newData, (err) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.json({ message: 'File updated' });
    });
});

app.delete('/txt/delete', (req, res) => {
    fs.unlink('data.txt', (err) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.json({ message: 'Deleted the file' });
    });
});


app.listen(3000, () => {console.log("APi is working on port 3000")})
