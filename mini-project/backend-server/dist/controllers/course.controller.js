import db from "../models/index.js";
import { massCreateHandler } from "../helpers/mass.create.handler.helper.js";
import { downloadHandler } from "../helpers/download.handler.helper.js";
const Course = db.Course;
const controller = {
    getAllCourses: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const { count, rows } = await Course.findAndCountAll({
                limit,
                offset,
                order: [["code", "ASC"]],
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
    massCreateCourses: massCreateHandler(Course),
    downloadCourses: downloadHandler(Course, "courses", "Courses", [
        { header: "ID", key: "id" },
        { header: "Code", key: "code" },
        { header: "Title", key: "title" },
        { header: "Description", key: "description" },
        { header: "Order", key: "order" },
        { header: "Data", key: "data" },
        { header: "Tag", key: "tag" },
        { header: "Active", key: "active" },
        { header: "Created At", key: "createdAt" },
        { header: "Updated At", key: "updatedAt" },
    ])
};
export default controller;
function uuidv4() {
    throw new Error("Function not implemented.");
}
// massCreateCourses: async (req: Request, res: Response) => {
//   const transaction = await db.sequelize.transaction();
//   try {
//     const rawCourses = req.body.data;
//     if (!Array.isArray(rawCourses)) {
//       res.status(400).json({ message: "Invalid input format bro" });
//       return;
//     }
//     const errors: string[] = [];
//     for (let i = 0; i < rawCourses.length; i++) {
//       const course = rawCourses[i];
//       const enrichedCourses = {
//         ...course,
//         id: course.id || uuidv4(),
//         data:
//           typeof course.data === "string" ? JSON.parse(course.data) : course.data,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       try {
//         // Check if user with ID exists
//         const existing = enrichedCourses.id
//           ? await Course.findByPk(enrichedCourses.id, { transaction: transaction })
//           : null;
//         if (existing) {
//           await existing.update(enrichedCourses, { transaction: transaction });
//         } else {
//           await Course.create(enrichedCourses, { transaction: transaction });
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
//     res.status(201).json({ message: "All courses imported successfully." });
//   } catch (error: any) {
//     await transaction.rollback();
//     console.error("Unexpected import error:", error);
//     res.status(500).json({
//       message: "Unexpected server error",
//       error: error.message,
//     });
//   }
// },
