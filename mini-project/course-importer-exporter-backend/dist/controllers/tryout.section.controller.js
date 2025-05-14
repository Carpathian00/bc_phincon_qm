import db from "../models/index.js";
import { massCreateHandler } from "../helpers/mass.create.handler.helper.js";
import { downloadHandler } from "../helpers/download.handler.helper.js";
const TryoutSection = db.TryoutSection;
const controller = {
    getAllTryoutSections: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const { count, rows } = await TryoutSection.findAndCountAll({
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
    massCreateTryoutSections: massCreateHandler(TryoutSection),
    downloadTryoutSections: downloadHandler(TryoutSection, "courses", "Courses", [
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
    ]),
};
export default controller;
