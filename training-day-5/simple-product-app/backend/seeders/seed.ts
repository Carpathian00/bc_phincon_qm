import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export default {
  async up(queryInterface: QueryInterface) {
    const now = new Date();
    const electronicsId = "id_category_" + "electronics";
    const audioId = "id_category_" + "audio";
    const wearablesId = "id_category_" + "wearables";

    const hashedPasswordAdmin = await bcrypt.hash("admin123456", 12);
    const hashedPasswordCashier = await bcrypt.hash("cashier123456", 12);
    const adminId = uuidv4();
    const transactionId = uuidv4();
    const transactionDetailId = uuidv4();

    const users = [
      {
        id: adminId,
        username: "admin",
        email: "admin@example.com",
        password: hashedPasswordAdmin,
        role: "admin",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        username: "cashier",
        email: "cashier@example.com",
        password: hashedPasswordCashier,
        role: "cashier",
        createdAt: now,
        updatedAt: now,
      },
    ];

    const categories = [
      {
        id: electronicsId,
        name: "Electronics",
        createdAt: now,
        updatedAt: now,
      },
      { 
        id: audioId, 
        name: "Audio", 
        createdAt: now, 
        updatedAt: now 
      },
      { 
        id: wearablesId, 
        name: "Wearables", 
        createdAt: now, 
        updatedAt: now },
    ];

    const product1Id = uuidv4();
    const product2Id = uuidv4();

    const products = [
      {
        id: product1Id,
        name: "Wireless Headphones",
        description: "Premium noise-cancelling headphones",
        price: 249.99,
        categoryId: audioId,
        stock: 100,
        imageUrl: "/api/placeholder/400/320",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: product2Id,
        name: "Fitness Tracker",
        description: "Track your activities and health metrics",
        price: 129.99,
        categoryId: wearablesId,
        stock: 75,
        imageUrl: "/api/placeholder/400/320",
        createdAt: now,
        updatedAt: now,
      },
    ];

    const transactions = [
      {
        id: transactionId,
        userId: adminId,
        cashierId: adminId,
        totalPrice: 249.99 + 129.99,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const transactionDetails = [
      {
        id: transactionDetailId,
        transactionId: transactionId,
        products: JSON.stringify([
          {
            id: product1Id,
            name: "Wireless Headphones",
            price: 249.99,
            qty: 1,
          },
          { id: product2Id, name: "Fitness Tracker", price: 129.99, qty: 1 },
        ]),
        createdAt: now,
        updatedAt: now,
      },
    ];

    await queryInterface.bulkInsert("users", users, {});
    await queryInterface.bulkInsert("categories", categories, {});
    await queryInterface.bulkInsert("products", products, {});
    await queryInterface.bulkInsert("transactions", transactions, {});
    await queryInterface.bulkInsert(
      "transaction_details",
      transactionDetails,
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("transaction_details", {});
    await queryInterface.bulkDelete("transactions", {});
    await queryInterface.bulkDelete("products", {});
    await queryInterface.bulkDelete("categories", {});
    await queryInterface.bulkDelete("users", {});
  },
};
