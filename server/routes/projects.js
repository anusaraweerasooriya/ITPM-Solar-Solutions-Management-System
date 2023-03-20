import express from "express";
import { createProject } from "../controllers/projects.js";

const router = express.Router();

router.post("/createProject", createProject);

export default router;