const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('def_activity_tasks', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_activity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'def_activities',
        key: 'ID'
      }
    },
    txt_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'def_activity_tasks',
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
        name: "def_activity_task_def_activity",
        using: "BTREE",
        fields: [
          { name: "nID_activity" },
        ]
      },
    ]
  });
};
