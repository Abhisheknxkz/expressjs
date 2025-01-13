const { getEntriesFromDB, createEntry } = require("./models");

module.exports = (app) => {
    app.get('/all-products', async (req, res) => {
        const getAllProductData = await getEntriesFromDB();
        res.json(getAllProductData);

        res.end();
    });

    app.post('/add-product', async (req, res) => {
        const body = req.body;
        console.log(req.body);
        const response = await createEntry(body);
        res.json(response);
    });

    app.get('/test', (req, res) => {
        res.json({test: "value"});
    });
};