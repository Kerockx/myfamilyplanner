module.exports = app => {
  
    const controller = require("../controllers/auth.controller.js");
    const api = "/api/auth";

    var router = require("express").Router();
    router.get("/authUser", controller.authUser);
  
    app.use(api, router);
  };