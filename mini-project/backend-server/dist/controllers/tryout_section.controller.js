import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import ExcelJS from "exceljs";
const TryoutSection = db.TryoutSection;
const controller = {
    getAllTryoutSections: async (req, res) => {
        try {
            const tryouts = await TryoutSection.findAll();
            res.status(200).json(tryouts);
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving tryouts", error });
        }
    },
    massCreateTryoutSections: async (req, res) => {
        const transaction = await db.sequelize.transaction();
        try {
            const rawTryoutSections = req.body.data;
            if (!Array.isArray(rawTryoutSections)) {
                res.status(400).json({ message: "Invalid input format bro" });
                return;
            }
            const errors = [];
            for (let i = 0; i < rawTryoutSections.length; i++) {
                const tryoutSection = rawTryoutSections[i];
                const enrichedTryoutSections = {
                    ...tryoutSection,
                    id: tryoutSection.id || uuidv4(),
                    data: typeof tryoutSection.data === "string" ? JSON.parse(tryoutSection.data) : tryoutSection.data,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                try {
                    // Check if user with ID exists
                    const existing = enrichedTryoutSections.id
                        ? await TryoutSection.findByPk(enrichedTryoutSections.id, { transaction: transaction })
                        : null;
                    if (existing) {
                        await existing.update(enrichedTryoutSections, { transaction: transaction });
                    }
                    else {
                        await TryoutSection.create(enrichedTryoutSections, { transaction: transaction });
                    }
                }
                catch (err) {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        const field = err.errors?.[0]?.path;
                        const value = err.errors?.[0]?.value;
                        const errorMessage = `Row ${i + 2}: ${field} already exists with value ${value}`;
                        errors.push(errorMessage);
                    }
                    else {
                        const errorMessage = `Row ${i + 2}: ${err.message}`;
                        errors.push(errorMessage);
                    }
                }
            }
            if (errors.length > 0) {
                await transaction.rollback();
                res.status(400).json({
                    message: "Import failed, no data was saved",
                    errors,
                });
                return;
            }
            await transaction.commit();
            res.status(201).json({ message: "All tryout sections imported successfully." });
        }
        catch (error) {
            await transaction.rollback();
            console.error("Unexpected import error:", error);
            res.status(500).json({
                message: "Unexpected server error",
                error: error.message,
            });
        }
    },
    downloadTryoutSections: async (req, res) => {
        try {
            const users = await TryoutSection.findAll();
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Users");
            worksheet.columns = [
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
            ];
            users.forEach((user) => {
                worksheet.addRow(user.toJSON());
            });
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename=tryout_sections.xlsx`);
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            console.error("Download error:", error);
            res.status(500).json({ message: "Error downloading users", error });
        }
    },
};
export default controller;
