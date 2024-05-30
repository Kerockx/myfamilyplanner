const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_tasks', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_task_category_sub_sub: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'def_task_category_sub_sub',
        key: 'ID'
      }
    },
    nID_family: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nID_task_to_repeat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tab_tasks',
        key: 'ID'
      }
    },
    txt_name: {
      type: DataTypes.STRING(255),
      allowNull: false
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
        name: "tab_tasks_nID_task_category_sub_sub",
        using: "BTREE",
        fields: [
          { name: "nID_task_category_sub_sub" },
        ]
      },
      {
        name: "tab_tasks_nID_tab_tasks_master_tab_tasks",
        using: "BTREE",
        fields: [
          { name: "nID_task_to_repeat" },
        ]
      },
    ]
  });
};
