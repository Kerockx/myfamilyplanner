module.exports = app => {
    const tableName = "def_task_category_sub_sub";
    
    console.log("../controllers/"+tableName+".controller.js");
    const controller = require("../controllers/"+tableName+".controller.js");
    const api = "/api/"+tableName;

    console.log(api);
    var router = require("express").Router();

    // Create a new object
    router.post("/", controller.create);
  
    // Retrieve all objects
    router.get("/", controller.findAll);
  
    // Retrieve an object with id
    router.get("/:id", controller.findOne);

    // Update an object with id
    router.put("/:id", controller.update);
  
    // Delete an object with id
    router.delete("/:id", controller.delete);
  
    // Delete all objects
    router.delete("/", controller.deleteAll);

    app.use(api, router);
  };