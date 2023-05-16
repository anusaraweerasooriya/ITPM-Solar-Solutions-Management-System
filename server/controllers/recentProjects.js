import Project from "../models/Project.js";
import RecentProject from "../models/RecentProject.js";

/* GET COMPLETED PROJECTS - ADMIN */
export const getAdminCompletedProjects = async (req, res) => {
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

        const completedProjects = await Project.find({
            $and: [
                { status: "Completed" },
                {
                    $or: [
                        { projectName: { $regex: new RegExp(search, "i") } },
                        { location: { $regex: new RegExp(search, "i") } },
                        { client: { $regex: new RegExp(search, "i") } },
                        { projectType: { $regex: new RegExp(search, "i") } },
                        { transaction: { $regex: new RegExp(search, "i") } },       
                    ]
                }]
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Project.find().find({
            status: "Completed",
            projectName: { $regex: search, $options: "i" }
        }).countDocuments();

        res.status(200).json({
            completedProjects,
            total
        });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

/* ADD TO RECENT */
export const addRecentProject = async(req,res) => {
    try {
        const {
            projectId,
            projectName,
            location,
            endDate,
            projectType,
            description,
            picturePath
        } = req.body;

        const newRecentProject = new RecentProject({
            projectId,
            projectName,
            location,
            endDate,
            projectType,
            description,
            picturePath
        });
        const savedRecentProject = await newRecentProject.save();
        res.status(201).json(savedRecentProject);

    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};