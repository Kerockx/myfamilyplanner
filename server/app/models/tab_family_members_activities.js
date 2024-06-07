const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_family_members_activities', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_family_member: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tab_family_members',
        key: 'ID'
      }
    },
    nID_def_activity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'def_activities',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'tab_family_members_activities',
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
        name: "tab_family_members_activities_activity",
        using: "BTREE",
        fields: [
          { name: "nID_def_activity" },
        ]
      },
      {
        name: "tab_family_members_activities_family_members",
        using: "BTREE",
        fields: [
          { name: "nID_family_member" },
        ]
      },
    ]
  });
};
