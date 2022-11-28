const mongoose = require("mongoose");
const Decimal128 = require("mongoose/lib/schema/decimal128");

const Carac = mongoose.model(
  "Caracteristicas",
  new mongoose.Schema({
    Apellido: String,
    NombreOrganizacion: String,
    Area: String,
    ExtraArea: String,
    AñoForm: String,
    Telefono: String,
    Pais: String,
    Region: String,
    Comuna: String,
    NFiscal: Number,
    MontoFact: Number,
    divisa: Decimal128,
    PagWeb: String,
    Redes: String,
    compacc: String,
    numwork: String,
    pfem: String,
    itype: String,
    indextra: String,
    accomr: String,
    certf: String,
    cerfextra: String,
    motiv: String,
    alcan: String,
    Lvl: String,

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  })
);

module.exports = Carac;
