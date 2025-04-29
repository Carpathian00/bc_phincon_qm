// seeders/seed.ts
import db from "../models/index.js";
const Product = db.products;

// Initial product data
const productData = [
  {
    name: "Smartphone X",
    description: "Latest smartphone with advanced features",
    price: 999.99,
    category: "Electronics",
    stock: 50,
    imageUrl: "/api/placeholder/400/320"
  },
  {
    name: "Laptop Pro",
    description: "High-performance laptop for professionals",
    price: 1299.99,
    category: "Electronics",
    stock: 25,
    imageUrl: "/api/placeholder/400/320"
  },
  {
    name: "Wireless Headphones",
    description: "Premium noise-cancelling headphones",
    price: 249.99,
    category: "Audio",
    stock: 100,
    imageUrl: "/api/placeholder/400/320"
  },
  {
    name: "Fitness Tracker",
    description: "Track your activities and health metrics",
    price: 129.99,
    category: "Wearables",
    stock: 75,
    imageUrl: "/api/placeholder/400/320"
  },
  {
    name: "Smart Watch",
    description: "Stay connected with this feature-rich smartwatch",
    price: 199.99,
    category: "Wearables",
    stock: 40,
    imageUrl: "/api/placeholder/400/320"
  }
];

// Seed the database
const seedDatabase = async () => {
    try {
      // Create products
      await Promise.all(
        productData.map(async (product) => {
          await Product.create(product);
        })
      );
      
      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };
  
  // If this file is run directly, seed the database
  if (require.main === module) {
    db.sequelize.sync({ force: true })
      .then(() => {
        console.log("Database synced");
        return seedDatabase();
      })
      .then(() => {
        console.log("Seeding completed");
        process.exit(0);
      })
      .catch(err => {
        console.error("Seeding failed:", err);
        process.exit(1);
      });
  }
  
  module.exports = seedDatabase;