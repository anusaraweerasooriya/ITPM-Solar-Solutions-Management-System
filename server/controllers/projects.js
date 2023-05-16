import Project from "../models/Project.js";

/* CREATE */
export const createProject = async (req, res) => {
    try {
        const {
            projectName,
            planId,
            location,
            client,
            projectType,
            description,
            transaction,
            status,
        } = req.body;

        const newProject = new Project ({
            projectName,
            planId,
            location,
            client,
            projectType,
            description,
            transaction,
            status,
        });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);

    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};

export const getProjectById = async (req, res, next) => {
    try {
      const { projId } = req.query;

      const project = await Project.findById(projId);
      res.status(200).json(project);
    } catch (err) {
      const error = new HttpError("Failed fetch data! Please try again", 500);
      return next(error);
    }
};