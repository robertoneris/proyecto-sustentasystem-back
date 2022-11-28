const db = require("../models");
const Client = db.client;
const ROLES = db.ROLES;

checkDuplicateEmail = (req, res, next) => {
  Client.findOne({
    Correo: req.body.Correo,
  }).exec((err, client) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (client) {
      res.status(400).send({ message: "Error! el Correo ya esta registrado" });
      return;

    }
    next();
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
