const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('def_activities', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_activity_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'def_activity_categories',
        key: 'ID'
      }
    },
    txt_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "txt_name"
    },
    is_main_activity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    is_hobby_activity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'def_activities',
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
        name: "def_activity_def_activity_category",
        using: "BTREE",
        fields: [
          { name: "nID_activity_category" },
        ]
      },
    ]
  });
};
