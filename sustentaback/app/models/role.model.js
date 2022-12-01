const mongoose = require("mongoose");
//modelo de los roles que podran tomar los usuarios  en moongoose para ingresarlas en mongoDB

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Role;
