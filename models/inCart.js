
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const inCart = new Schema({
  size: String,
  idCart: String,
  user: String,
  name: String,
  price: String,
});
 
 
// Create a model based on that schema
const incart = mongoose.model("inCart", inCart);
 
 
// export the model
module.exports = incart; 
