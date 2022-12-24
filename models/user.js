
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const user = new Schema({
  username: String,
  password: String,
});
 
 
// Create a model based on that schema
const User = mongoose.model("User", user);
 
 
// export the model
module.exports = User; 
