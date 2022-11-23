const mongoose = require("mongoose");

const Enc = mongoose.model(
    "Encuesta" ,
     new mongoose.Schema({
        IdPregunta: Number,
        Pregunta: String,
    })
)
module.exports = "Enc";