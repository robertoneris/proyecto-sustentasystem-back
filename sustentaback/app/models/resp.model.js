const mongoose = require("mongoose");

const Resp = mongoose.model(
    "Respuestas",
    new mongoose.Schema({
        resp1 : Number,
        resp2 : Number,
        resp3 : Number,
        resp4 : Number,
        resp5 : Number,
        resp6 : Number,
        resp7 : Number,
        resp8 : Number,
        resp9 : Number,
        resp10 : Number,
        users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Client"
        }
      ]
    })
  );
  
  module.exports = Resp;
  