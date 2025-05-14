import ExcelJS from "exceljs";
export const downloadHandler = (Model, filename, worksheetName, columns) => async (req, res) => {
    try {
        const items = await Model.findAll();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(worksheetName);
        worksheet.columns = columns;
        items.forEach((item) => worksheet.addRow(item.toJSON()));
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=${filename}.xlsx`);
        await workbook.xlsx.write(res);
        res.end();
    }
    catch (error) {
        res.status(500).json({ message: "Download failed", error: error.message });
    }
};
