const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_family_members', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_def_family_member_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'def_family_member_types',
        key: 'ID'
      }
    },
    nID_family: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tab_familys',
        key: 'ID'
      }
    },
    txt_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tab_family_members',
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
        name: "tab_family_members_tab_family",
        using: "BTREE",
        fields: [
          { name: "nID_family" },
        ]
      },
      {
        name: "tab_family_members_def_family_member",
        using: "BTREE",
        fields: [
          { name: "nID_def_family_member_type" },
        ]
      },
    ]
  });
};
