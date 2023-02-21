
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const donecart = new Schema({
    user: String,
    name: Array
});
 
 
// Create a model based on that schema
const doneCart = mongoose.model("donecart", donecart);
 
 
// export the model
module.exports = doneCart; 
