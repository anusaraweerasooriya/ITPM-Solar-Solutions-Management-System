import Project from "../models/Project.js";
import RecentProject from "../models/RecentProject.js";

/* GET COMPLETED PROJECTS - ADMIN */
export const getAdminCompletedProjects = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //format sort
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

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
          ],
        },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Project.find()
      .find({
        status: "Completed",
        projectName: { $regex: search, $options: "i" },
      })
      .countDocuments();

    res.status(200).json({
      completedProjects,
      total,
    });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export const getAdminRecentProjects = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //format sort
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const projects = await RecentProject.find({
      $or: [
        { projectId: { $regex: new RegExp(search, "i") } },
        { projectName: { $regex: new RegExp(search, "i") } },
        { location: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await RecentProject.countDocuments({
      clientName: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      projects,
      total,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong! Please try again.", 404);
    return next(error);
  }
};

export const deleteRecentProject = async (req, res, next) => {
  const { prodId } = req.params;

  let project;
  try {
    project = await RecentProject.findById(prodId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the project",
      500
    );
    return next(error);
  }

  if (!project) {
    const error = new HttpError(
      "We could not find a project for given id",
      404
    );
    return next(error);
  }

  try {
    await RecentProject.deleteOne({ _id: prodId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could'nt delete the project.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Project deleted successfully!" });
};


export const updateRecentProject = async (req, res, next) => {
  let project;
  try {
    const { projectName, location, description } = req.body;

    const { prodId } = req.params;
    project = await RecentProject.findById(prodId);

    project.projectName = projectName;
    project.location = location;
    project.description = description;
  } catch (err) {
    const error = new HttpError("Something went wrong. Please try again.", 422);
    return next(error);
  }

  try {
    await project.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the request",
      500
    );
    return next(error);
  }

  res.status(200).json({ project });
};

export const getRecentProjectById = async (req, res, next) => {
  try {
    const { prodId } = req.params;

    const project = await RecentProject.findById(prodId);
    console.log(project);
    res.status(200).json(project);
  } catch (err) {
    const error = new HttpError("Failed fetch data! Please try again", 500);
    return next(error);
  }
};

export const getRecentProjects = async (req, res, next) => {
  try {
      const recentProjects = await RecentProject.find();
      res.status(200).json(recentProjects);
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
