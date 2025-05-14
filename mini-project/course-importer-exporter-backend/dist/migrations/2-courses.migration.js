import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
export const up = async (queryInterface) => {
    await queryInterface.createTable("courses", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: () => uuidv4(),
        },
        code: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        order: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        data: {
            allowNull: false,
            type: DataTypes.JSON,
        },
        tag: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        active: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
};
export const down = async (queryInterface) => {
    await queryInterface.dropTable("courses");
};
