const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('def_task_category_sub', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_def_task_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'def_task_category',
        key: 'ID'
      }
    },
    txt_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    n_order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'def_task_category_sub',
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
        name: "def_task_category_sub_def_task_category",
        using: "BTREE",
        fields: [
          { name: "nID_def_task_category" },
        ]
      },
    ]
  });
};
