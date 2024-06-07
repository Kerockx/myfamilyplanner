module.exports = app => {
    const tableName = "setup_family";
    const controller = require("../controllers/"+tableName+".controller.js");
    const api = "/api/"+tableName;

    console.log(api);
    var router = require("express").Router();

    // Create a new object
    router.post("/", controller.setupFamily);
  
    app.use(api, router);
  };