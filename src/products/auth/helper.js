const {request} = require('express');

function validateToken (req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if(typeof(bearerHeader)!== 'undefined') {
        //Bearer dksbafjkewnkdafkjaew
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        request.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    validateToken
}