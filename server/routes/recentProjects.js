import express from "express";
import {
  getAdminCompletedProjects,
  getAdminRecentProjects,
  deleteRecentProject,
  updateRecentProject,
  getRecentProjectById,
} from "../controllers/recentProjects.js";

const router = express.Router();

router.get("/completedProjects", getAdminCompletedProjects);
router.get("/getAdminRecentProjects", getAdminRecentProjects);
router.delete("/deleteRecentProject/:prodId", deleteRecentProject);
router.patch("/updateRecentProject/:prodId", updateRecentProject);
router.get("/getRecentProjectById/:prodId", getRecentProjectById);

export default router;
