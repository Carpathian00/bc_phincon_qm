import { UniqueConstraintError } from "sequelize";
import { v4 as uuidv4 } from "uuid";
export const massCreateHandler = (Model, enrichFn) => async (req, res) => {
    const tr = await Model.sequelize.transaction();
    const rawData = req.body.data;
    if (!Array.isArray(rawData)) {
        res.status(400).json({ message: "Invalid input format bro" });
        return;
    }
    const errors = [];
    for (let i = 0; i < rawData.length; i++) {
        const item = rawData[i];
        const enrichedData = {
            ...item,
            id: item.id || uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...(enrichFn ? await enrichFn(item) : {})
        };
        if (typeof enrichedData.data === "string") {
            try {
                enrichedData.data = JSON.parse(enrichedData.data);
            }
            catch (error) {
                errors.push(`Row ${i + 2}: Failed to parse 'data' field`);
                continue;
            }
        }
        try {
            const existing = enrichedData.id
                ? await Model.findByPk(enrichedData.id, { transaction: tr })
                : null;
            if (existing) {
                await existing.update(enrichedData, { transaction: tr });
            }
            else {
                await Model.create(enrichedData, { transaction: tr });
            }
        }
        catch (error) {
            if (error instanceof UniqueConstraintError) {
                const { path, value } = error.errors?.[0] || {};
                errors.push(`Row ${i + 2}: duplicate "${value}" in field "${path}"`);
            }
            else {
                errors.push(`Row ${i + 2}: ${error.message}`);
            }
        }
    }
    if (errors.length > 0) {
        await tr.rollback();
        res.status(400).json({ message: "Import failed", errors });
        return;
    }
    await tr.commit();
    res.status(201).json({ message: "Import succeeded" });
    return;
};
