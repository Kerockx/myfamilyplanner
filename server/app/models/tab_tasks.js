const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_tasks', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_family: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nID_activity_task: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'def_activity_tasks',
        key: 'ID'
      }
    },
    txt_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    n_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    d_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    t_starttime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tab_tasks',
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
        name: "tab_task_def_activity_task",
        using: "BTREE",
        fields: [
          { name: "nID_activity_task" },
        ]
      },
    ]
  });
};
