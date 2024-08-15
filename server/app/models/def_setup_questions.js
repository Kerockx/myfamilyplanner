const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('def_setup_questions', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    txt_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "txt_name"
    },
    n_setup_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "n_setup_state"
    }
  }, {
    sequelize,
    tableName: 'def_setup_questions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "txt_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "txt_name" },
        ]
      },
      {
        name: "n_setup_state",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "n_setup_state" },
        ]
      },
    ]
  });
};
