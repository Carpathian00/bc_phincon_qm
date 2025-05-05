/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { transactionModel } from "types/transaction.type.js";

export default (sequelize: Sequelize) => {
  class Transaction extends Model<transactionModel> {
    static associate(models: any) {
      Transaction.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Transaction.belongsTo(models.User, {
        foreignKey: "cashierId",
        as: "cashier",
      });

      Transaction.hasOne(models.TransactionDetail, {
        foreignKey: "transactionId",
        as: "transactionDetails",
      });
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      cashierId: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Transaction",
      tableName: "transactions",
    }
  );

  return Transaction;
};
