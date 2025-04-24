import User from "./User";
import Job from "./Job";
import sequelize from "../config/database";

Job.belongsTo(User, {foreignKey: "userId"});
User.hasMany(Job, {foreignKey: "userId"});

const initDB = async () => {
  await sequelize.sync({force: false});
};

export {sequelize, initDB, User, Job};