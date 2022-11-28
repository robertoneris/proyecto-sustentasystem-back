const mongoose = require("mongoose");

const Client = mongoose.model(

    "Client",
    new mongoose.Schema({
        Nombre: String,
        Correo : String,
        Contraseña : String,
        roles: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Role"
            }
          ]
    })
);
module.exports = Client;