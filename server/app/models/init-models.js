var DataTypes = require("sequelize").DataTypes;
var _def_activity = require("./def_activity");
var _def_daytime = require("./def_daytime");
var _def_family_member_type = require("./def_family_member_type");
var _def_task_category = require("./def_task_category");
var _def_task_category_sub = require("./def_task_category_sub");
var _def_task_category_sub_sub = require("./def_task_category_sub_sub");
var _def_task_repeat = require("./def_task_repeat");
var _def_task_type = require("./def_task_type");
var _def_weekday = require("./def_weekday");
var _tab_family_members = require("./tab_family_members");
var _tab_family_members_activities = require("./tab_family_members_activities");
var _tab_familys = require("./tab_familys");
var _tab_task_masters = require("./tab_task_masters");
var _tab_tasks = require("./tab_tasks");
var _tab_timeslots = require("./tab_timeslots");
var _tab_users = require("./tab_users");
var _tabz_tab_tasks_tab_family_members = require("./tabz_tab_tasks_tab_family_members");

function initModels(sequelize) {
  var def_activity = _def_activity(sequelize, DataTypes);
  var def_daytime = _def_daytime(sequelize, DataTypes);
  var def_family_member_type = _def_family_member_type(sequelize, DataTypes);
  var def_task_category = _def_task_category(sequelize, DataTypes);
  var def_task_category_sub = _def_task_category_sub(sequelize, DataTypes);
  var def_task_category_sub_sub = _def_task_category_sub_sub(sequelize, DataTypes);
  var def_task_repeat = _def_task_repeat(sequelize, DataTypes);
  var def_task_type = _def_task_type(sequelize, DataTypes);
  var def_weekday = _def_weekday(sequelize, DataTypes);
  var tab_family_members = _tab_family_members(sequelize, DataTypes);
  var tab_family_members_activities = _tab_family_members_activities(sequelize, DataTypes);
  var tab_familys = _tab_familys(sequelize, DataTypes);
  var tab_task_masters = _tab_task_masters(sequelize, DataTypes);
  var tab_tasks = _tab_tasks(sequelize, DataTypes);
  var tab_timeslots = _tab_timeslots(sequelize, DataTypes);
  var tab_users = _tab_users(sequelize, DataTypes);
  var tabz_tab_tasks_tab_family_members = _tabz_tab_tasks_tab_family_members(sequelize, DataTypes);

  tab_family_members_activities.belongsTo(def_activity, { as: "nID_def_activity_def_activity", foreignKey: "nID_def_activity"});
  def_activity.hasMany(tab_family_members_activities, { as: "tab_family_members_activities", foreignKey: "nID_def_activity"});
  tab_family_members.belongsTo(def_family_member_type, { as: "nID_def_family_member_type_def_family_member_type", foreignKey: "nID_def_family_member_type"});
  def_family_member_type.hasMany(tab_family_members, { as: "tab_family_members", foreignKey: "nID_def_family_member_type"});
  def_task_category_sub.belongsTo(def_task_category, { as: "nID_def_task_category_def_task_category", foreignKey: "nID_def_task_category"});
  def_task_category.hasMany(def_task_category_sub, { as: "def_task_category_subs", foreignKey: "nID_def_task_category"});
  def_task_category_sub_sub.belongsTo(def_task_category_sub, { as: "nID_def_task_category_sub_def_task_category_sub", foreignKey: "nID_def_task_category_sub"});
  def_task_category_sub.hasMany(def_task_category_sub_sub, { as: "def_task_category_sub_subs", foreignKey: "nID_def_task_category_sub"});
  tab_tasks.belongsTo(def_task_category_sub_sub, { as: "nID_task_category_sub_sub_def_task_category_sub_sub", foreignKey: "nID_task_category_sub_sub"});
  def_task_category_sub_sub.hasMany(tab_tasks, { as: "tab_tasks", foreignKey: "nID_task_category_sub_sub"});
  tab_family_members_activities.belongsTo(tab_family_members, { as: "nID_family_member_tab_family_member", foreignKey: "nID_family_member"});
  tab_family_members.hasMany(tab_family_members_activities, { as: "tab_family_members_activities", foreignKey: "nID_family_member"});
  tabz_tab_tasks_tab_family_members.belongsTo(tab_family_members, { as: "nID_family_member_tab_family_member", foreignKey: "nID_family_member"});
  tab_family_members.hasMany(tabz_tab_tasks_tab_family_members, { as: "tabz_tab_tasks_tab_family_members", foreignKey: "nID_family_member"});
  tab_family_members.belongsTo(tab_familys, { as: "nID_family_tab_family", foreignKey: "nID_family"});
  tab_familys.hasMany(tab_family_members, { as: "tab_family_members", foreignKey: "nID_family"});
  tab_tasks.belongsTo(tab_tasks, { as: "nID_task_to_repeat_tab_task", foreignKey: "nID_task_to_repeat"});
  tab_tasks.hasMany(tab_tasks, { as: "tab_tasks", foreignKey: "nID_task_to_repeat"});
  tabz_tab_tasks_tab_family_members.belongsTo(tab_tasks, { as: "nID_task_tab_task", foreignKey: "nID_task"});
  tab_tasks.hasMany(tabz_tab_tasks_tab_family_members, { as: "tabz_tab_tasks_tab_family_members", foreignKey: "nID_task"});

  return {
    def_activity,
    def_daytime,
    def_family_member_type,
    def_task_category,
    def_task_category_sub,
    def_task_category_sub_sub,
    def_task_repeat,
    def_task_type,
    def_weekday,
    tab_family_members,
    tab_family_members_activities,
    tab_familys,
    tab_task_masters,
    tab_tasks,
    tab_timeslots,
    tab_users,
    tabz_tab_tasks_tab_family_members,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
