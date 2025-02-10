import User from "./User";
import Job from "./Job";
import sequelize from "../config/database";

User.hasMany(Job);
Job.belongsTo(User);

const initDB = async () => {
  await sequelize.sync({force: false});
};

export {sequelize, initDB, User, Job};