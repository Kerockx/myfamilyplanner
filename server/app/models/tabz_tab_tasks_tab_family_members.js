const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tabz_tab_tasks_tab_family_members', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_task: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tab_tasks',
        key: 'ID'
      }
    },
    nID_family_member: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tab_family_members',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'tabz_tab_tasks_tab_family_members',
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
        name: "tabz_tab_tasks_tab_family_members-tab_tasks",
        using: "BTREE",
        fields: [
          { name: "nID_task" },
        ]
      },
      {
        name: "tabz_tab_tasks_tab_family_members_tab_family_members",
        using: "BTREE",
        fields: [
          { name: "nID_family_member" },
        ]
      },
    ]
  });
};
