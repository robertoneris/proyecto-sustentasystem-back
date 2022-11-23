const db = require("../models");
const Client = db.client;

checkDuplicateEmail = (req, res, next) => {
  Client.findOne({
    Correo: req.body.Correo,
  }).exec((err, Correo) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (Correo) {
      res.status(400).send({ message: "Error! el Correo ya esta registrado" });
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

const verifySigUp = {
  checkDuplicateEmail,
  checkRolesExisted
};

module.exports = verifySigUp;
