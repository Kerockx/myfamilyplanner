const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
 // timezone: 'Europe/Berlin',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.def_family_member = require('./def_family_member.js')(sequelize, Sequelize);
db.def_task_category = require('./def_task_category.js')(sequelize, Sequelize);
db.def_task_category_sub = require('./def_task_category_sub.js')(sequelize, Sequelize);
db.def_task_category_sub_sub = require('./def_task_category_sub_sub.js')(sequelize, Sequelize);
db.tab_familys = require('./tab_familys.js')(sequelize, Sequelize);
db.tab_family_members = require('./tab_family_members.js')(sequelize, Sequelize);
db.tab_tasks = require('./tab_tasks.js')(sequelize, Sequelize);
db.tabZ_tab_tasks_tab_family_members = require('./tabz_tab_tasks_tab_family_members.js')(sequelize, Sequelize);

const debug = require('debug')('db:autocreate');
const tableModel = {};

Object.getOwnPropertyNames(sequelize.models).forEach(function (modelName) {
  const tableName = sequelize.models[modelName].getTableName();
  tableModel[tableName] = sequelize.models[modelName];
});

Object.getOwnPropertyNames(sequelize.models).forEach(function (modelName) {
  const currentModel = sequelize.models[modelName];
  Object.getOwnPropertyNames(currentModel.rawAttributes).forEach(function (attributeName) {
    if (Object.prototype.hasOwnProperty.call(currentModel.rawAttributes[attributeName], "references") && Object.prototype.hasOwnProperty.call(currentModel.rawAttributes[attributeName].references, "model") && Object.prototype.hasOwnProperty.call(currentModel.rawAttributes[attributeName].references, "key")) {
      if (!(currentModel.rawAttributes[attributeName].references.model && currentModel.rawAttributes[attributeName].references.key)) {
        debug(`*SKIPPED* ${modelName} ${attributeName} references a model ${currentModel.rawAttributes[attributeName].references.model} with key ${currentModel.rawAttributes[attributeName].references.key}`);
        return;
      }

      debug(`${modelName} ${attributeName} references a model ${currentModel.rawAttributes[attributeName].references.model} with key ${currentModel.rawAttributes[attributeName].references.key}`);
      const referencedTable = tableModel[currentModel.rawAttributes[attributeName].references.model];
      currentModel.belongsTo(referencedTable, { foreignKey: attributeName });
      referencedTable.hasMany(currentModel, { foreignKey: attributeName, onUpdate: 'CASCADE', onDelete: 'CASCADE'});
    }
  })
})


module.exports = db;
