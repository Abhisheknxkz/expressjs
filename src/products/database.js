const { MongoClient } = require("mongodb");
const { DB, DB_NAME, DB_COLLECTION } = require("../../config");

const client = new MongoClient(DB);

async function productsDB() {
    console.log(DB, DB_NAME, DB_COLLECTION);
    const connect = await client.connect();
    const dbConnect = connect.db(DB_NAME);

    return dbConnect.collection(DB_COLLECTION);
}

module.exports = { productsDB };