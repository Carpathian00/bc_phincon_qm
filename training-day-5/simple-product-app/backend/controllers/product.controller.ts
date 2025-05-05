/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
const Product = db.Product;


const controller = {
  // Create and Save a new Product
  create: async (req: Request, res: Response):Promise<any> => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).json({
        message: "Name cannot be empty!"
      });
    }
    if (!req.body.price) {
      return res.status(400).json({
        message: "Price cannot be empty!"
      });
    }

    const product = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.categoryId,
      stock: req.body.stock || 0,
      imageUrl: req.body.imageUrl
    };
    
    // Save Product in the database
    const data = await Product.create(product);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Product."
    });
  }
  },

  // Retrieve all products
  findAll: async (req: Request, res: Response) => {
  try {
    const data = await Product.findAll();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving products."
    });
  }
  },

  // Find a single product with an id
  findOne: async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Product.findByPk(id);
    
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({
        message: `Product with id=${id} not found.`
      });
    }
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      message: `Error retrieving Product with id=${req.params.id}`
    });
  }
  },

  // Update a Product by the id in the request
  update: async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const num = await Product.update(req.body, {
      where: { id: id }
    });
    
    if (num[0] === 1) {
      res.json({
        message: "Product was updated successfully."
      });
    } else {
      res.status(404).json({
        message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
      });
    }
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      message: `Error updating Product with id=${req.params.id}`
    });
  }
  },

  // Delete a Product with the specified id in the request
  delete: async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const num = await Product.destroy({
      where: { id: id }
    });
    
    if (num === 1) {
      res.json({
        message: "Product was deleted successfully!"
      });
    } else {
      res.status(404).json({
        message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
      });
    }
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      message: `Could not delete Product with id=${req.params.id}`
    });
  }
  },

  // Delete all products
  deleteAll: async (req: Request, res: Response) => {
  try {
    const nums = await Product.destroy({
      where: {},
      truncate: false
    });
    
    res.json({
      message: `${nums} Products were deleted successfully!`
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Some error occurred while removing all products."
    });
  }
  },

  // Find products by category
  findByCategory: async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const data = await Product.findAll({
      where: { category: categoryId }
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving products."
    });
  }
  }
};

export default controller;