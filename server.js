const express = require("express");
const { products } = require("./src");

const server = async () => {
    const app = express();
    await products(app);

    console.log("server")
    
    app.listen(3000, () => {
        console.log("API is listening at 3000")
    }).on("error", (err) => {
        console.log(err);
    });
    
};

server();