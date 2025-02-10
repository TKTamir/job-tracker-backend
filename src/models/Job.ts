import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";

class Job extends Model {
  public id!: number;
  public companyName!: string;
  public positionName!: string;
  public applicationDate!: string;
  public status!: string;
  public companyWebsite!: string;
  public jobAd!: string;
  public generalInfo!: string;
  public progression!: string;
  public requestedSalary!: string;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyWebsite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobAd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    generalInfo: {
      type: DataTypes.STRING,
    },
    progression: {
      type: DataTypes.STRING,
    },
    requestedSalary: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Job",
    tableName: "jobs",
    timestamps: true,
  }
);

export default Job;
