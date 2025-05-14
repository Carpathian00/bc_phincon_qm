import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
export const up = async (queryInterface) => {
    await queryInterface.createTable("users", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: () => uuidv4(),
        },
        fullname: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        phoneNumber: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        active: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        data: {
            allowNull: false,
            type: DataTypes.JSON,
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
    await queryInterface.dropTable("users");
};
