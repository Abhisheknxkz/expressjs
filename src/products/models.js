const { Db } = require("mongodb");
const { DB } = require("../../config");
const { productsDB } = require("./database");

const Model = require("./schema");

async function getEntriesFromDB() {
    const conection = await productsDB();
    console.log("server");
    const data = await conection.find({}).toArray();

    return data;
}

async function createEntry(data) {
    console.log(data);
    const conection = await productsDB();
    const productEntry = new Model(data);
    const insertData = await conection.insertOne(productEntry);
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