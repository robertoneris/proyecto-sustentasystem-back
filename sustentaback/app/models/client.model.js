const mongoose = require("mongoose");
//modelo del cliente  en moongoose para ingresarlas en mongoDB

const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    Nombre: String,
    Correo: String,
    Contraseña: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);
module.exports = Client;
