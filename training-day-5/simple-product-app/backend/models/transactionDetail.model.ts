/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { transactionDetailModel } from "types/transactionDetail.type";

export default (sequelize: Sequelize) => {
  class TransactionDetail extends Model<transactionDetailModel> {
    static associate(models: any) {
      TransactionDetail.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
        as: "transaction"
      });
    }
  }

  TransactionDetail.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      products: {
        type: DataTypes.JSON,
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
      modelName: "TransactionDetail",
      tableName: "transactions_details",
    }
  );

  return TransactionDetail;
};
