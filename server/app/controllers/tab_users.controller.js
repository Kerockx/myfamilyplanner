const db = require("../models");
const TABLE = db.tab_users;
const Op = db.Sequelize.Op;

// Create and Save a new Object
exports.create = (req, res) => {
  const object = req.body
  TABLE.create(object)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Object."
      });
    });
};

// Retrieve all Objects from the database.
exports.findAll = (req, res) => {
  TABLE.findAll({attributes: {exclude: ['password','email']}})
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
  TABLE.findByPk(pk,{
    attributes: {exclude: ['password','email']},
    include:[{ model: db.tab_familys}]
  })
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
  const transaction = await db.sequelize.transaction();
  try{
    await TABLE.update(req.body,{where:{id:pk}});
    const OBJECT = await TABLE.findByPk(pk,{attributes: {exclude: ['password','email']}})
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