const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tabZ_tab_users_tab_familys', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tab_users',
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
    }
  }, {
    sequelize,
    tableName: 'tabZ_tab_users_tab_familys',
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
        name: "tabZ_tab_users_tab_familys_tab_users",
        using: "BTREE",
        fields: [
          { name: "nID_user" },
        ]
      },
      {
        name: "tabZ_tab_users_tab_familys_tab_familys",
        using: "BTREE",
        fields: [
          { name: "nID_family" },
        ]
      },
    ]
  });
};
