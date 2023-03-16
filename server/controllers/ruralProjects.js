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
        const { page=1, pageSize=20, sort=null, search="" } = req.query;
        
        //format sort
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };
            return sortFormatted;
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {}

        const ruralProjects = await RuralProject.find({
            $or: [
                { projectName: { $regex: new RegExp(search, "i") } },
                { location: { $regex: new RegExp(search, "i") } },
                { projectType: { $regex: new RegExp(search, "i") } },
                { gridType: { $regex: new RegExp(search, "i") } },
                { status: { $regex: new RegExp(search, "i") } },       
            ]
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await RuralProject.countDocuments({
            projectName: { $regex: search, $options: "i" }
        });

        res.status(200).json({
            ruralProjects,
            total
        });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};