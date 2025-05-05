/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, Model, DataTypes } from "sequelize";
import { UserModel } from "../types/user.type.js";
import { v4 as uuidv4 } from "uuid";

export default (sequelize: Sequelize) => {
  class User extends Model<UserModel> {

    static associate(models: any) {
      User.hasMany(models.Transaction, {
        foreignKey: "userId",
        as: "transactions",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
