const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_timeslots', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nID_family_member: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nID_weekday: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    t_no_task_start: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    t_no_task_end: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    }
  }, {
    sequelize,
    tableName: 'tab_timeslots',
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
