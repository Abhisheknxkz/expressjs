const express = require(`express`)

const app = express()

app.get('/daniella', (req, res) => {

    res.write("Hello World!")

    // res.write([1,2,3]);
    res.json([1,2,3]);

    res.end()

})

app.listen(3000, () => {console.log("APi is working on port 3000")})