import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";

class Job extends Model {
  public id!: string;
  public companyName!: string;
  public positionName!: string;
  public applicationDate!: string;
  public status!: string;
  public companyWebsite!: string;
  public jobAd!: string;
  public generalInfo!: string;
  public progression!: string;
  public requestedSalary!: string;
  public userId!: string;
}

Job.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Job",
    tableName: "jobs",
    timestamps: true,
  }
);

export default Job;
