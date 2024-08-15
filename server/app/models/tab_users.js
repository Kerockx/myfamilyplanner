const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_users', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    txt_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nID_current_family: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tab_familys',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'tab_users',
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
        name: "tab_users_tab_familys",
        using: "BTREE",
        fields: [
          { name: "nID_current_family" },
        ]
      },
    ]
  });
};
