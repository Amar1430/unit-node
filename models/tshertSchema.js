
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const thserySchema = new Schema({
  name: String,
  price: Number,
});
 
 
// Create a model based on that schema
const Tshert = mongoose.model("Tshert", thserySchema);
 
 
// export the model
module.exports = Tshert; 
