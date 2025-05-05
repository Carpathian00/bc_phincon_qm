// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Sequelize, Model, DataTypes } from "sequelize";
// import { v4 as uuidv4 } from "uuid";
// import { CartModel } from "../types/cart.type.js";

// export default (sequelize: Sequelize) => {
//   class Cart extends Model<CartModel> {
//     static associate(models: any) {
//       Cart.belongsTo(models.User, {
//         foreignKey: "userId",
//         as: "user",
//       });

//       Cart.belongsTo(models.Product, {
//         foreignKey: "productId",
//         as: "product",
//       });
//     }
//   }

//   Cart.init(
//     {
//       id: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         defaultValue: () => uuidv4(),
//       },
//       userId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       productId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       totalPrice: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false,
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//     },
//     {
//       sequelize,
//       modelName: "Cart",
//       tableName: "carts",
//     }
//   );
//   return Cart;
// };
