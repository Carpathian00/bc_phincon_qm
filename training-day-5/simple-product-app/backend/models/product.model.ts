/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, Model, DataTypes } from "sequelize";
import { ProductModel } from "../types/product.type.js";

export default (sequelize: Sequelize) => {
  class Product extends Model<ProductModel> {
    static associate(models: any) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );

  return Product;
};
