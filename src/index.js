const express = require(`express`)

const app = express()
app.use(express.json())

app.get('/daniella', (req, res) => {

    res.write("Hello World!")

    // res.write([1,2,3]);
    res.json([1,2,3]);

    res.end()

})

app.post('/login', (req, res) => {

    const header = req.headers;
    const body = req.body;
 
    if (header.somekey == "secret")
    {
        console.log(body)    
        console.log(header)
    }
    else
    {
        res.status(404).write("wrong key");
    }

    res.end();
    

})


app.listen(3000, () => {console.log("APi is working on port 3000")})