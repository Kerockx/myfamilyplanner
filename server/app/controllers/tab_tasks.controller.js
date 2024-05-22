const db = require("../models");
const TABLE = db.tab_tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Object
exports.create = async (req, res) => {

  console.log(req.body);
  const family_members = req.body.family_members;
  const transaction = await db.sequelize.transaction();
  try{


    const OBJECT = await TABLE.create(req.body)


    if(family_members.length > 0){
      family_members.forEach(obj => {
        const object = {nID_task:OBJECT.ID,nID_family_member:obj};
        db.tabZ_tab_tasks_tab_family_members.create(object); 
      });
    }
  
    await transaction.commit();
    res.send(OBJECT);
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Error updating Object",
    });
  }

};

// Retrieve all Objects from the database.
exports.findAll = (req, res) => {
  TABLE.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving objects."
      });
    });
};

// Retrieve all Objects from the database.
exports.findAllByFamily = (req, res) => {
  const ID = req.params.id

  TABLE.findAll({
    where:{nID_family:ID},
    include:[
      {model:db.def_task_category_sub_sub,include:[{model:db.def_task_category_sub,include:db.def_task_category}]},
      {model:db.tabZ_tab_tasks_tab_family_members,include:db.tab_family_members}
    ]
    } 
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving objects."
      });
    });
};

// Find a single Object with an id
exports.findOne = (req, res) => {
  const pk = req.params.id;
  TABLE.findByPk(pk)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Object with id=${pk}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Object with id=" + pk
      });
    });
};

// Update a Object by the id in the request
exports.update = async (req, res) => {
  const pk = req.params.id;
  const family_members = req.body.family_members;
  const transaction = await db.sequelize.transaction();
  try{
    await TABLE.update(req.body,{where:{id:pk}});
    await db.tabZ_tab_tasks_tab_family_members.destroy({where: { nID_task: pk }});
    if(family_members.length > 0){
      family_members.forEach(obj => {
        const object = {nID_task:pk,nID_family_member:obj};
        console.log(object);
        db.tabZ_tab_tasks_tab_family_members.create(object);
        
      });
    }
    const OBJECT = await TABLE.findByPk(pk)
    await transaction.commit();
    res.send(OBJECT);
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Error updating Object",
    });
  }
};

// Delete an Object with the specified id in the request
exports.delete = (req, res) => {
  const pk = req.params.id;
  TABLE.destroy({
    where: { id: pk }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Object was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Object with pk=${pk}. Maybe Object was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Object with pk=" + pk
      });
    });
};

// Delete all Objects from the database.
exports.deleteAll = (req, res) => {
  TABLE.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Objects were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Objects."
      });
    });
};