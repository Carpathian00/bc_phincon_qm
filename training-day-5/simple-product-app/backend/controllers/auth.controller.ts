/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

const User = db.User;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-jwt-key';

console.log(db.User);

const authController = {
  // Register a new user
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password, role = 'cashier' } = req.body;
        console.log("KE HIT");
      if (!username || !email || !password) {
        res.status(400).json({ message: "Username, email and password are required!" });
        return;
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: "Email is already in use!" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        role,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const userWithoutPassword = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      res.status(201).json({
        message: "User registered successfully!",
        user: userWithoutPassword,
        token
      });
    } catch (err: any) {
      res.status(500).json({
        message: err.message || "Some error occurred while registering the user."
      });
      return;
    }
  },

  // Login user
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required!" });
        return;
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password!" });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const userWithoutPassword = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      res.status(200).json({
        message: "Login successful!",
        user: userWithoutPassword,
        token
      });
    } catch (err: any) {
      res.status(500).json({
        message: err.message || "Some error occurred while logging in."
      });
    }
  },

  // Get current user
  getCurrentUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized!" });
        return;
      }

      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      const userWithoutPassword = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      res.status(200).json({ user: userWithoutPassword });
    } catch (err: any) {
      res.status(500).json({
        message: err.message || "Some error occurred while fetching user data."
      });
    }
  }
};

export default authController;
