const config = require("../config/auth.config");
const db = require("../models");
const Client = db.client;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { client } = require("../models");

exports.Signup = (req,res) =>{
    const client = new client({
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Correo: req.body.Correo,
        Contraseña: bcrypt.hashSync(req.body.password,8),
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
        PagWeb: req.body.PagWeb,
        Redes: req.body.Redes,
        compacc: req.body.compacc,
        numwork: req.body.numwork,
        pfem: req.body.pfem,
        itype: req.body.itype,
        accomr: req.body.accomr,
        certf: req.body.certf,
        motiv: req.body.motiv,
        alcan: req.body.alcan,
        indextra: req.body.indextra,
        cerfextra: req.body.cerfextra,
    });
    client.save((err, client) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles }
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              client.roles = roles.map(role => role._id);
              client.save(err => {
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
            client.save(err => {
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

exports.signin = (req,res) =>{
    Client.findOne({
        Correo:req.body.Correo
    })
    .populate("roles","-__v")
    .exec((err,client) => {
        if(err){
            res.status(500).send({messafe:err});
            return;
        }
        if(!client){
            return res.status(404).semd({message:"Correo no encontrado"})
        }
        var passwordIsvalid = bcrypt.compareSync(
            req.body.Contraseña,
            client.Contraseña
        );
        if(!passwordIsvalid){
            return res.status(401).send({
                accessToken: null,
                message:"contraseña incorrecta!"
            });
        }
        var token = jwt.sign({id: client.id},config.secret,
            {expiresIn:86400
            });
   
    var authorities = [];
    for (let i = 0; i < client.roles.length ; i++){
        authorities.push("ROLE_" + client.roles[i].name.toUpperCase());
    }
    res.status(200).send({
        id:client._id,
        Correo:client.Correo,
        roles:authoritiesm,
        accessToken:token
    });
 });
};