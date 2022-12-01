const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//pagina index de los modelos declarados en el backend

const db = {};

db.mongoose = mongoose;
//si se desea agregar otra tabla se debe de agregar al index a continuacion de los ya creados
db.client = require("./client.model");
db.role = require("./role.model");
db.carac = require("./carac.model");
db.resp = require("./resp.model");

db.ROLES = ["user", "admin"];

module.exports = db;
