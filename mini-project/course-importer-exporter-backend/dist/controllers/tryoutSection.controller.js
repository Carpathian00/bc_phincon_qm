import db from "../models/index.js";
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
};
export default controller;
