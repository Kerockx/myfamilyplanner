var DataTypes = require("sequelize").DataTypes;
var _def_activities = require("./def_activities");
var _def_activity_categories = require("./def_activity_categories");
var _def_activity_tasks = require("./def_activity_tasks");
var _def_daytimes = require("./def_daytimes");
var _def_family_member_types = require("./def_family_member_types");
var _def_task_category = require("./def_task_category");
var _def_task_category_sub = require("./def_task_category_sub");
var _def_task_category_sub_sub = require("./def_task_category_sub_sub");
var _def_task_repeat = require("./def_task_repeat");
var _def_task_type = require("./def_task_type");
var _def_weekday = require("./def_weekday");
var _tabZ_tab_tasks_tab_family_members = require("./tabZ_tab_tasks_tab_family_members");
var _tabZ_tab_users_tab_familys = require("./tabZ_tab_users_tab_familys");
var _tab_family_members = require("./tab_family_members");
var _tab_family_members_activities = require("./tab_family_members_activities");
var _tab_familys = require("./tab_familys");
var _tab_task_masters = require("./tab_task_masters");
var _tab_tasks = require("./tab_tasks");
var _tab_timeslots = require("./tab_timeslots");
var _tab_users = require("./tab_users");

function initModels(sequelize) {
  var def_activities = _def_activities(sequelize, DataTypes);
  var def_activity_categories = _def_activity_categories(sequelize, DataTypes);
  var def_activity_tasks = _def_activity_tasks(sequelize, DataTypes);
  var def_daytimes = _def_daytimes(sequelize, DataTypes);
  var def_family_member_types = _def_family_member_types(sequelize, DataTypes);
  var def_task_category = _def_task_category(sequelize, DataTypes);
  var def_task_category_sub = _def_task_category_sub(sequelize, DataTypes);
  var def_task_category_sub_sub = _def_task_category_sub_sub(sequelize, DataTypes);
  var def_task_repeat = _def_task_repeat(sequelize, DataTypes);
  var def_task_type = _def_task_type(sequelize, DataTypes);
  var def_weekday = _def_weekday(sequelize, DataTypes);
  var tabZ_tab_tasks_tab_family_members = _tabZ_tab_tasks_tab_family_members(sequelize, DataTypes);
  var tabZ_tab_users_tab_familys = _tabZ_tab_users_tab_familys(sequelize, DataTypes);
  var tab_family_members = _tab_family_members(sequelize, DataTypes);
  var tab_family_members_activities = _tab_family_members_activities(sequelize, DataTypes);
  var tab_familys = _tab_familys(sequelize, DataTypes);
  var tab_task_masters = _tab_task_masters(sequelize, DataTypes);
  var tab_tasks = _tab_tasks(sequelize, DataTypes);
  var tab_timeslots = _tab_timeslots(sequelize, DataTypes);
  var tab_users = _tab_users(sequelize, DataTypes);

  def_activity_tasks.belongsTo(def_activities, { as: "nID_activity_def_activity", foreignKey: "nID_activity"});
  def_activities.hasMany(def_activity_tasks, { as: "def_activity_tasks", foreignKey: "nID_activity"});
  tab_family_members_activities.belongsTo(def_activities, { as: "nID_def_activity_def_activity", foreignKey: "nID_def_activity"});
  def_activities.hasMany(tab_family_members_activities, { as: "tab_family_members_activities", foreignKey: "nID_def_activity"});
  def_activities.belongsTo(def_activity_categories, { as: "nID_activity_category_def_activity_category", foreignKey: "nID_activity_category"});
  def_activity_categories.hasMany(def_activities, { as: "def_activities", foreignKey: "nID_activity_category"});
  tab_tasks.belongsTo(def_activity_tasks, { as: "nID_activity_task_def_activity_task", foreignKey: "nID_activity_task"});
  def_activity_tasks.hasMany(tab_tasks, { as: "tab_tasks", foreignKey: "nID_activity_task"});
  tab_family_members.belongsTo(def_family_member_types, { as: "nID_def_family_member_type_def_family_member_type", foreignKey: "nID_def_family_member_type"});
  def_family_member_types.hasMany(tab_family_members, { as: "tab_family_members", foreignKey: "nID_def_family_member_type"});
  def_task_category_sub.belongsTo(def_task_category, { as: "nID_def_task_category_def_task_category", foreignKey: "nID_def_task_category"});
  def_task_category.hasMany(def_task_category_sub, { as: "def_task_category_subs", foreignKey: "nID_def_task_category"});
  def_task_category_sub_sub.belongsTo(def_task_category_sub, { as: "nID_def_task_category_sub_def_task_category_sub", foreignKey: "nID_def_task_category_sub"});
  def_task_category_sub.hasMany(def_task_category_sub_sub, { as: "def_task_category_sub_subs", foreignKey: "nID_def_task_category_sub"});
  tabZ_tab_tasks_tab_family_members.belongsTo(tab_family_members, { as: "nID_family_member_tab_family_member", foreignKey: "nID_family_member"});
  tab_family_members.hasMany(tabZ_tab_tasks_tab_family_members, { as: "tabZ_tab_tasks_tab_family_members", foreignKey: "nID_family_member"});
  tab_family_members_activities.belongsTo(tab_family_members, { as: "nID_family_member_tab_family_member", foreignKey: "nID_family_member"});
  tab_family_members.hasMany(tab_family_members_activities, { as: "tab_family_members_activities", foreignKey: "nID_family_member"});
  tabZ_tab_users_tab_familys.belongsTo(tab_familys, { as: "nID_family_tab_family", foreignKey: "nID_family"});
  tab_familys.hasMany(tabZ_tab_users_tab_familys, { as: "tabZ_tab_users_tab_families", foreignKey: "nID_family"});
  tab_family_members.belongsTo(tab_familys, { as: "nID_family_tab_family", foreignKey: "nID_family"});
  tab_familys.hasMany(tab_family_members, { as: "tab_family_members", foreignKey: "nID_family"});
  tabZ_tab_tasks_tab_family_members.belongsTo(tab_tasks, { as: "nID_task_tab_task", foreignKey: "nID_task"});
  tab_tasks.hasMany(tabZ_tab_tasks_tab_family_members, { as: "tabZ_tab_tasks_tab_family_members", foreignKey: "nID_task"});
  tabZ_tab_users_tab_familys.belongsTo(tab_users, { as: "nID_user_tab_user", foreignKey: "nID_user"});
  tab_users.hasMany(tabZ_tab_users_tab_familys, { as: "tabZ_tab_users_tab_families", foreignKey: "nID_user"});

  return {
    def_activities,
    def_activity_categories,
    def_activity_tasks,
    def_daytimes,
    def_family_member_types,
    def_task_category,
    def_task_category_sub,
    def_task_category_sub_sub,
    def_task_repeat,
    def_task_type,
    def_weekday,
    tabZ_tab_tasks_tab_family_members,
    tabZ_tab_users_tab_familys,
    tab_family_members,
    tab_family_members_activities,
    tab_familys,
    tab_task_masters,
    tab_tasks,
    tab_timeslots,
    tab_users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
