import db from "../models/index.js";
import bcrypt from "bcrypt";
import { generateRandomPassword } from "../helpers/generate.random.string.js";
import { massCreateHandler } from "../helpers/mass.create.handler.helper.js";
import { downloadHandler } from "../helpers/download.handler.helper.js";
const User = db.User;
export const userController = {
    getAllUsers: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const { count, rows } = await User.findAndCountAll({
                limit,
                offset,
                order: [["fullname", "ASC"]],
            });
            res.status(200).json({
                data: rows,
                pagination: {
                    total: count,
                    page,
                    limit,
                    totalPages: Math.ceil(count / limit),
                }
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving users", error });
        }
    },
    massCreateUsers: massCreateHandler(User, async (user) => {
        const password = generateRandomPassword(10);
        const hashedPassword = await bcrypt.hash(password, 10);
        return {
            phoneNumber: String(user.phoneNumber),
            password: hashedPassword,
        };
    }),
    downloadUsers: downloadHandler(User, "users", "Users", [
        { header: "ID", key: "id" },
        { header: "Full Name", key: "fullname" },
        { header: "Username", key: "username" },
        { header: "Email", key: "email" },
        { header: "Phone Number", key: "phoneNumber" },
        { header: "Role", key: "role" },
        { header: "Active", key: "active" },
        { header: "Data", key: "data" },
        { header: "Created At", key: "createdAt" },
        { header: "Updated At", key: "updatedAt" },
    ]),
};
// massCreateUsers: async (req: Request, res: Response) => {
//   const transaction = await db.sequelize.transaction();
//   try {
//     const rawUsers = req.body.data;
//     const success: any[] = [];
//     const failed: any[] = [];
//     if (!Array.isArray(rawUsers)) {
//       res.status(400).json({ message: "Invalid input format bro" });
//       return;
//     }
//     const errors: string[] = [];
//     for (let i = 0; i < rawUsers.length; i++) {
//       const user = rawUsers[i];
//       const password = generateRandomPassword(10);
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const enriched = {
//         ...user,
//         id: user.id || uuidv4(),
//         phoneNumber: String(user.phoneNumber),
//         password: hashedPassword,
//         data:
//           typeof user.data === "string" ? JSON.parse(user.data) : user.data,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       try {
//         // Check if user with ID exists
//         const existing = enriched.id
//           ? await User.findByPk(enriched.id, { transaction: transaction })
//           : null;
//         if (existing) {
//           await existing.update(enriched, { transaction: transaction });
//         } else {
//           await User.create(enriched, { transaction: transaction });
//         }
//       } catch (err: any) {
//         if (err.name === "SequelizeUniqueConstraintError") {
//           const field = err.errors?.[0]?.path;
//           const value = err.errors?.[0]?.value;
//           const errorMessage = `Row ${
//             i + 2
//           }: ${field} already exists with value ${value}`;
//           errors.push(errorMessage);
//         } else {
//           const errorMessage = `Row ${i + 2}: ${err.message}`;
//           errors.push(errorMessage);
//         }
//       }
//     }
//     if (errors.length > 0) {
//       await transaction.rollback();
//       res.status(400).json({
//         message: "Import failed, no data was saved",
//         errors,
//       });
//       return;
//     }
//     await transaction.commit();
//     res.status(201).json({ message: "All users imported successfully." });
//   } catch (error: any) {
//     await transaction.rollback();
//     console.error("Unexpected import error:", error);
//     res.status(500).json({
//       message: "Unexpected server error",
//       error: error.message,
//     });
//   }
// },
