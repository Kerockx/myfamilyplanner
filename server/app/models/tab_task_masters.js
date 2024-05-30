const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_task_masters', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_task: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nID_repeat_task: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    n_duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    d_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tab_task_masters',
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
    ]
  });
};
