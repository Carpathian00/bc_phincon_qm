import { QueryInterface, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("products", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
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
        allowNull: true,
        references: {
          model: "categories", // name of the table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // or "CASCADE" if you want child products removed on category deletion
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
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("products");
  },
};
