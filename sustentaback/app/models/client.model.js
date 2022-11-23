const mongoose = require("mongoose");

const Client = mongoose.model(

    "Client",
    new mongoose.Schema({
        Nombre : String,
        Apellido : String,
        Correo : String,
        Contraseña : String,
        NombreOrganizacion : String,
        Area : String,
        ExtraArea : String,
        AñoForm :   Number,
        Telefono :  Number,
        Pais : String,
        Region : String,
        Comuna : String,
        NFiscal : Number,
        MontoFact : Number,
        PagWeb : String,
        Redes : String,         
        compacc : String,
        numwork : String,
        pfem : String,
        itype : String,
        accomr : String,
        certf : String,
        motiv : String,
        alcan : String,
        indextra : String,
        cerfextra : String,
        roles: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Role"
            }
          ]
    })
);
module.export = Client