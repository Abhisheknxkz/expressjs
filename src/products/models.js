const { Db } = require("mongodb");
const { DB } = require("../../config");
const { productsDB } = require("./database");

async function getEntriesFromDB() {
    const conection = await productsDB();
    console.log("server");
    const data = await conection.find({}).toArray();

    return data;
}

async function createEntry(data) {
    const conection = await productsDB();
    console.log(data);
    const insertData = await conection.insertOne(data);
    if (insertData.acknowledged)
    {
        return {
            message: "DB inserted",
        }
    }
    else {
        return {
            message: "error: DB not inserted",
        }
    }
}

module.exports = { getEntriesFromDB, createEntry };