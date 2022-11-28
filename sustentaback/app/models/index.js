const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.client = require("./client.model")
db.role = require("./role.model");
db.carac = require("./carac.model");
db.resp = require("./resp.model");

db.ROLES = ["user", "admin"];

module.exports = db;