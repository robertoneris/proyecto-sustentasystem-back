const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
//pagina de rutas desde la que se redirige en el backend para ejecutar las distintas funciones disponibles
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/auth/sigcarac", controller.regCarac);
  app.post("/api/auth/sigresp", controller.regresp);
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    controller.signup
  );
  app.post("/api/auth/ems", controller.sendmail);
  app.post("/api/auth/signin", controller.signin);
};
