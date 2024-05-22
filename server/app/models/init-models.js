var DataTypes = require("sequelize").DataTypes;
var _def_family_member = require("./def_family_member");
var _def_task_category = require("./def_task_category");
var _def_task_category_sub = require("./def_task_category_sub");
var _def_task_category_sub_sub = require("./def_task_category_sub_sub");
var _tab_family_members = require("./tab_family_members");
var _tab_familys = require("./tab_familys");
var _tab_tasks = require("./tab_tasks");
var _tab_users = require("./tab_users");
var _tabz_tab_tasks_tab_family_members = require("./tabz_tab_tasks_tab_family_members");

function initModels(sequelize) {
  var def_family_member = _def_family_member(sequelize, DataTypes);
  var def_task_category = _def_task_category(sequelize, DataTypes);
  var def_task_category_sub = _def_task_category_sub(sequelize, DataTypes);
  var def_task_category_sub_sub = _def_task_category_sub_sub(sequelize, DataTypes);
  var tab_family_members = _tab_family_members(sequelize, DataTypes);
  var tab_familys = _tab_familys(sequelize, DataTypes);
  var tab_tasks = _tab_tasks(sequelize, DataTypes);
  var tab_users = _tab_users(sequelize, DataTypes);
  var tabz_tab_tasks_tab_family_members = _tabz_tab_tasks_tab_family_members(sequelize, DataTypes);

  tab_family_members.belongsTo(def_family_member, { as: "nID_def_family_member_def_family_member", foreignKey: "nID_def_family_member"});
  def_family_member.hasMany(tab_family_members, { as: "tab_family_members", foreignKey: "nID_def_family_member"});
  def_task_category_sub.belongsTo(def_task_category, { as: "nID_def_task_category_def_task_category", foreignKey: "nID_def_task_category"});
  def_task_category.hasMany(def_task_category_sub, { as: "def_task_category_subs", foreignKey: "nID_def_task_category"});
  def_task_category_sub_sub.belongsTo(def_task_category_sub, { as: "nID_def_task_category_sub_def_task_category_sub", foreignKey: "nID_def_task_category_sub"});
  def_task_category_sub.hasMany(def_task_category_sub_sub, { as: "def_task_category_sub_subs", foreignKey: "nID_def_task_category_sub"});
  tab_tasks.belongsTo(def_task_category_sub_sub, { as: "nID_task_category_sub_sub_def_task_category_sub_sub", foreignKey: "nID_task_category_sub_sub"});
  def_task_category_sub_sub.hasMany(tab_tasks, { as: "tab_tasks", foreignKey: "nID_task_category_sub_sub"});
  tabz_tab_tasks_tab_family_members.belongsTo(tab_family_members, { as: "nID_family_member_tab_family_member", foreignKey: "nID_family_member"});
  tab_family_members.hasMany(tabz_tab_tasks_tab_family_members, { as: "tabz_tab_tasks_tab_family_members", foreignKey: "nID_family_member"});
  tab_family_members.belongsTo(tab_familys, { as: "nID_family_tab_family", foreignKey: "nID_family"});
  tab_familys.hasMany(tab_family_members, { as: "tab_family_members", foreignKey: "nID_family"});
  tabz_tab_tasks_tab_family_members.belongsTo(tab_tasks, { as: "nID_task_tab_task", foreignKey: "nID_task"});
  tab_tasks.hasMany(tabz_tab_tasks_tab_family_members, { as: "tabz_tab_tasks_tab_family_members", foreignKey: "nID_task"});

  return {
    def_family_member,
    def_task_category,
    def_task_category_sub,
    def_task_category_sub_sub,
    tab_family_members,
    tab_familys,
    tab_tasks,
    tab_users,
    tabz_tab_tasks_tab_family_members,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;