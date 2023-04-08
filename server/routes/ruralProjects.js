import express from "express";
import { getAdminRuralProjects, getRuralProjectById, getRuralProjects, updateRuralProject } from "../controllers/ruralProjects.js";

const router = express.Router();

router.get("/adminRuralProjects", getAdminRuralProjects);
router.get("/ruralProjects", getRuralProjects);
router.patch("/updateRuralProject/:pid", updateRuralProject);
router.get("/getRuralProjectById", getRuralProjectById);

export default router; 