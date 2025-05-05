/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import db from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

const Cart = db.Cart;

const controller = {
    getUserCarts: async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const data = await Cart.findAll({
                where: { userId: userId }
            });
            res.json(data);
        } catch (err: any) {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving carts."
            });
        }
    },

    createNewCart: async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const cart = {
                id: uuidv4(),
                userId: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const data = await Cart.create(cart);
            res.status(201).json(data);
        } catch (err: any) {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Cart."
            });
        }
    }

}

export default controller;

