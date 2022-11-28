const config = require("../config/auth.config");
const db = require("../models");
const Client = db.client;
const Role = db.role;
const Carac = db.carac;
const Resp = db.resp;
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { auth } = require("google-auth-library");

exports.signup = (req, res) => {
  const client = new Client({
    Nombre: req.body.Nombre,
    Correo: req.body.Correo,
    Contraseña: bcrypt.hashSync(req.body.Contraseña, 8),
  });
  client.save((err, client) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          client.roles = roles.map((role) => role._id);
          client.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Usuario registrado correctamente!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        client.roles = [role._id];
        client.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Usuario registrado correctamente!" });
        });
      });
    }
  });
};
exports.regCarac = (req, res) => {
  const carac = new Carac({
    Apellido: req.body.Apellido,
    NombreOrganizacion: req.body.NombreOrganizacion,
    Area: req.body.Area,
    ExtraArea: req.body.ExtraArea,
    AñoForm: req.body.AñoForm,
    Telefono: req.body.Telefono,
    Pais: req.body.Pais,
    Region: req.body.Region,
    Comuna: req.body.Comuna,
    NFiscal: req.body.NFiscal,
    MontoFact: req.body.MontoFact,
    divisa: req.body.divisa,
    PagWeb: req.body.PagWeb,
    Redes: req.body.Redes,
    compacc: req.body.compacc,
    numwork: req.body.numwork,
    pfem: req.body.pfem,
    itype: req.body.itype,
    indextra: req.body.indextra,
    accomr: req.body.accomr,
    certf: req.body.certf,
    cerfextra: req.body.cerfextra,
    motiv: req.body.motiv,
    alcan: req.body.alcan,
    Lvl: req.body.Lvl,
  });
  carac.save((err, carac) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Client.findOne({ Correo: req.body.Correo }, (err, client) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      carac.users = [client._id];
      carac.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "Caracteristicas guardadas!" });
      });
    });
  });
};
exports.regresp = (req, res) => {
  const resp = new Resp({
    resp1: req.body.resp1,
    resp2: req.body.resp2,
    resp3: req.body.resp3,
    resp4: req.body.resp4,
    resp5: req.body.resp5,
    resp6: req.body.resp6,
    resp7: req.body.resp7,
    resp8: req.body.resp8,
    resp9: req.body.resp9,
    resp10: req.body.resp10,
  });
  resp.save((err, resp) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Client.findOne({ Correo: req.body.Correo }, (err, client) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      resp.users = [client._id];
      resp.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "respuestas guardadas!" });
      });
    });
  });
};
exports.signin = (req, res) => {
  Client.findOne({
    Correo: req.body.Correo,
  })
    .populate("roles", "-__v")
    .exec((err, client) => {
      if (err) {
        res.status(500).send({ messafe: err });
        return;
      }
      if (!client) {
        return res.status(404).send({ message: "Correo no encontrado" });
      }
      var passwordIsvalid = bcrypt.compareSync(
        req.body.Contraseña,
        client.Contraseña
      );
      if (!passwordIsvalid) {
        return res.status(401).send({
          accessToken: null,
          message: "contraseña incorrecta!",
        });
      }
      var token = jwt.sign({ id: client.id }, config.secret, {
        expiresIn: 86400,
      });

      var authorities = [];
      for (let i = 0; i < client.roles.length; i++) {
        authorities.push("ROLE_" + client.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: client._id,
        username: client.Nombre,
        roles: authorities,
        accessToken: token,
      });
    });
};
var CLIENT_ID =
  "591851699847-eh04b1p6vdto8jglsck9cct8ddk415ce.apps.googleusercontent.com";
var CLIENT_SECRET = "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";
var REDIRECT_URI = "https://developers.google.com/oauthplayground";
var REFRESH_TOKEN =
  "1//04ppjArz1O4ubCgYIARAAGAQSNwF-L9Irz4HlbWj1bHlou1u4eRL0zj81VrowK5k5zX9Q2nv7OMyurpmZba6k3HAIUYH7VYBp6_M";
var oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
exports.sendmail = (req, res) => {
  const accessToken = oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "rnerisn2@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  const mailOptions = {
    from: "roberto <rnerisn2@gmail.com>",
    to: "jorge.inc.gt@gmail.com",
    subject: "prueba de nodemailer",
    text: req.body.mensaje,
    
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      res.status(500).send(err.message);
    } else {
      console.log("Email enviado");
      res.status(200).send("datos enviado correctamente");
    }
  });
};
