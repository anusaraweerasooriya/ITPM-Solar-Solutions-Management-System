import RuralProject from "../models/RuralProject.js";

/* CREATE */
export const createRuralProject = async (req, res) => {
    try {
        const {
            projectName,
            location,
            projectType,
            monthlyConsumption,
            gridType,
            estimInitiateDate,
            estimEndDate,
            estimTotalCost,
            imagePath,
            description,
            currentAllocation,
            status
        } = req.body;

        const newRuralProject = new RuralProject({
            projectName,
            location,
            projectType,
            monthlyConsumption,
            gridType,
            estimInitiateDate,
            estimEndDate,
            estimTotalCost,
            imagePath,
            description,
            currentAllocation,
            status
        });
        const savedRuralProject = await newRuralProject.save();
        res.status(201).json(savedRuralProject);

    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};

/* READ */
export const getRuralProjects = async (req, res) => {
    try {
        const ruralProjects = await RuralProject.find();
        res.status(200).json(ruralProjects);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};