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

db.tab_users = require('./tab_users.js')(sequelize, Sequelize);
db.def_activities = require('./def_activities.js')(sequelize, Sequelize);
db.def_activity_tasks = require('./def_activity_tasks.js')(sequelize, Sequelize);
db.def_activity_categories = require('./def_activity_categories.js')(sequelize, Sequelize);
db.def_daytimes = require('./def_daytimes.js')(sequelize, Sequelize);
db.def_family_member_types = require('./def_family_member_types.js')(sequelize, Sequelize);
db.def_task_category = require('./def_task_category.js')(sequelize, Sequelize);
db.def_task_category_sub = require('./def_task_category_sub.js')(sequelize, Sequelize);
db.def_task_category_sub_sub = require('./def_task_category_sub_sub.js')(sequelize, Sequelize);
db.def_task_repeat = require('./def_task_repeat.js')(sequelize, Sequelize);
db.def_setup_questions = require('./def_setup_questions.js')(sequelize, Sequelize);
db.def_weekdy = require('./def_weekday.js')(sequelize, Sequelize);
db.tab_familys = require('./tab_familys.js')(sequelize, Sequelize);
db.tab_family_members = require('./tab_family_members.js')(sequelize, Sequelize);
db.tab_family_members_activities = require('./tab_family_members_activities.js')(sequelize, Sequelize);
db.tab_tasks = require('./tab_tasks.js')(sequelize, Sequelize);
db.tabZ_tab_tasks_tab_family_members = require('./tabZ_tab_tasks_tab_family_members.js')(sequelize, Sequelize);
db.tabZ_tab_users_tab_familys = require('./tabZ_tab_users_tab_familys.js')(sequelize, Sequelize);

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
