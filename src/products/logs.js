const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// TXT
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

// JSON

const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

app.post('/json/create', async (req, res) => {
    const newData = req.body;
    try {
        let data = await readJsonFile('data.json');
        data.push(newData);
        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ err });
            }
            res.status(201).json({ message: 'Added data succesfully' });
        });
    } catch (err) {
        res.status(500).json({ err });
    }
});

app.get('/json/read', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ err });
        }
        res.json(JSON.parse(data));
    });
});

app.put('/json/update/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        let data = await readJsonFile('data.json');
        let index = data.findIndex(item => item.id == id);
        if (index !== -1) {
            data[index] = updatedData;
            fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ err });
                }
                res.json({ message: 'Update data succesfully' });
            });
        } else {
            res.status(404).json({ message: 'ID not found' });
        }
    } catch (err) {
        res.status(500).json({ err });
    }
});

app.delete('/json/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let data = await readJsonFile('data.json');
        let index = data.findIndex(item => item.id == id);
        if (index !== -1) {
            data.splice(index, 1);
            fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ err });
                }
                res.json({ message: 'Deleted data' });
            });
        } else {
            res.status(404).json({ message: 'ID not found' });
        }
    } catch (err) {
        res.status(500).json({ err });
    }
});

app.listen(3000, () => {console.log("APi is working on port 3000")})
