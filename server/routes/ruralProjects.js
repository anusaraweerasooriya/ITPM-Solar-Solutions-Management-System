import express from "express";
import { getAdminRuralProjects, getRuralProjectById, getRuralProjects, deleteRuralProject } from "../controllers/ruralProjects.js";

const router = express.Router();

router.get("/adminRuralProjects", getAdminRuralProjects);
router.get("/ruralProjects", getRuralProjects);
router.get("/getRuralProjectById", getRuralProjectById);
router.delete("/deleteRuralProject/:pid", deleteRuralProject);

export default router; 