import express from "express";
import { createProject, getProjectById } from "../controllers/projects.js";

const router = express.Router();

router.post("/createProject", createProject);
router.get("/getProjectById", getProjectById);

export default router;