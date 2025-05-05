/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, Model, DataTypes } from "sequelize";
import { CategoryModel } from "../types/category.type.js";
import { v4 as uuidv4 } from "uuid";

export default (sequelize: Sequelize) => {
  class Category extends Model<CategoryModel> {
    static associate(models: any) {
      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
        as: "products",
      });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4()
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      modelName: "Category",
      tableName: "categories",
    }
  );

  return Category;
};