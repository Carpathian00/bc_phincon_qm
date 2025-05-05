/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

const Category = db.Category;
const Product = db.Product;

// Get all categories with products
const controller = {
    findAll: async (req: Request, res: Response): Promise<any> => {
        try {
            const categories = await Category.findAll({
                include: [
                    {
                        model: Product,
                        as: "products"
                    },
                ]
            });
            res.json(categories);
        } catch (err: any) {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving categories."
            });
        }
    },

    insert: async (req: Request, res: Response): Promise<any> => {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: "Category name cannot be empty!"
                })
            }

            const category = await Category.create({
                id: uuidv4(),
                name,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            res.status(201).json(category);
        } catch (err: any) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Category."
            });
        }
    }
}

export default controller;