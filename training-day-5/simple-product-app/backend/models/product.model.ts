/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sequelize, Model, DataTypes } from "sequelize";
import { ProductModel } from "../types/product.type.js";

export default (sequelize: Sequelize) => {
    class Product extends Model<ProductModel> {
        static associate(models: any) {}
    }

    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            category: {
                type: DataTypes.STRING
            },
            stock: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            imageUrl: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
        }
    );

    return Product;
};
