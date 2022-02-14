const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Float,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
