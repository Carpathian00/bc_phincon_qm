import express from 'express';
import products from '../controllers/product.controller.js';
const router = express.Router();

// Create a new Product
router.post("/", products.create);
                
// Retrieve all Products
router.get("/", products.findAll);

// Retrieve a single Product 
// with id
router.get("/:id", products.findOne);

// Update a Product with id
router.put("/:id", products.update);

// Delete a Product with id
router.delete("/:id", products.delete);

// Delete all Products
router.delete("/", products.deleteAll);

// Find products by category
router.get("/category/:category", products.findByCategory);

export default router;