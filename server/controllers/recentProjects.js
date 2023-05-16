import Project from "../models/Project.js";
import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";


/* CREATE */
export const createRecentProject = async (req, res) => {
    try {
        const {
            projectName,
            location,
            projectType,
            gridType,
            imagePath,
            description,
            currentAllocation,
            status
        } = req.body;

        const newRecentProject = new Project({
            projectName,
            location,
            projectType,
            gridType,
            imagePath,
            description,
            currentAllocation,
            status
        });
        const savedRecentProject = await newRecentProject.save();
        res.status(201).json(savedRecentProject);

    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};



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


/* CLIENT READ */
export const getRecentProject = async (req, res) => {
    try {
        const recentProjects = await Project.find();
        res.status(200).json(recentProjects);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};


/* UPDATE */
export const updateRecentProject = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data", 403)
      );
    }
  
    console.log(req.body);
  
    let project;
    try {
        const {
            projectName,
            location,
            projectType,
            gridType,
            imagePath,
            description,
            currentAllocation,
            status
        } = req.body;
  
        const projectId = req.params.pid;  
        project = await Project.findById(projectId);
    
        project.projectName = projectName;
        project.location = location;
        project.projectType = projectType;
        project.gridType = gridType;
        project.imagePath = imagePath;
        project.description = description;
        project.currentAllocation = currentAllocation;
        project.status = status;
        } catch (err) {
        const error = new HttpError("Something went wrong. Please try again.", 422);
        return next(error);
        }
    
        try {
        await project.save();
        } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not update the project",
            500
        );
        return next(error);
        }
    
        res.status(200).json({ project });
};

//GET
export const getRecentProjectById = async (req, res, next) => {
    try {
      const { projId } = req.query;

      const project = await Project.findById(projId);
      res.status(200).json(project);
    } catch (err) {
      const error = new HttpError("Failed fetch data! Please try again", 500);
      return next(error);
    }
};



export const getRuralProjectById = async (req, res, next) => {
    try {
      const { projId } = req.query;

      const project = await RuralProject.findById(projId);
      res.status(200).json(project);
    } catch (err) {
      const error = new HttpError("Failed fetch data! Please try again", 500);
      return next(error);
    }
};


//DELETE
  export const deleteRecentProject = async (req, res, next) => {
    const projId = req.params.pid;
  
    let request;
    try {
      request = await Project.findById(projId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete the request",
        500
      );
      return next(error);
    }
  
    if (!request) {
      const error = new HttpError("We could not find a project for given id", 404);
      return next(error);
    }
  
    try {
      await Project.deleteOne({ _id: projId });
    } catch (err) {
      const error = new HttpError(
        "Something went wrong. Could not delete the project.",
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: "Rural project deleted successfully!" });
  };