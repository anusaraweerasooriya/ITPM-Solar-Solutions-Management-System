import RuralProject from "../models/RuralProject.js";
import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";

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

/* ADMIN READ */
export const getAdminRuralProjects = async (req, res) => {
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

/* CLIENT READ */
export const getRuralProjects = async (req, res) => {
    try {
        const ruralProjects = await RuralProject.find();
        res.status(200).json(ruralProjects);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

/* UPDATE */
export const updateRuralProject = async (req, res, next) => {
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
  
        const projectId = req.params.pid;  
        project = await RuralProject.findById(projectId);
    
        project.projectName = projectName;
        project.location = location;
        project.projectType = projectType;
        project.monthlyConsumption = monthlyConsumption;
        project.gridType = gridType;
        project.estimInitiateDate = estimInitiateDate;
        project.estimEndDate = estimEndDate;
        project.estimTotalCost = estimTotalCost;
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

  export const deleteRuralProject = async (req, res, next) => {
    const projId = req.params.pid;
  
    let request;
    try {
      request = await RuralProject.findById(projId);
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
      await RuralProject.deleteOne({ _id: projId });
    } catch (err) {
      const error = new HttpError(
        "Something went wrong. Could not delete the project.",
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: "Rural project deleted successfully!" });
  };

