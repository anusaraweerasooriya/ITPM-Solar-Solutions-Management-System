import express from "express";
import { getAdminCompletedProjects } from "../controllers/recentProjects.js";

const router = express.Router();

router.get("/completedProjects", getAdminCompletedProjects)

export default router;