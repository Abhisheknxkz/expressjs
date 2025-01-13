const dotenv = require("dotenv");

dotenv.config();
module.exports = { 
    DB: process.env.MONGODB_URL,
    DB_NAME: process.env.MONGODB_DB_NAME,
    DB_COLLECTION: process.env.MONGODB_COLLECTION_NAME
 }