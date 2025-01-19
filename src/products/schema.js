const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    stock: Schema.Types.Number,
    price: Schema.Types.Double
});

module.exports = model("names", productsSchema);

