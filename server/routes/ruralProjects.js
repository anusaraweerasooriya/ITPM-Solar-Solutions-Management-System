import express from "express";
import { getAdminRuralProjects, getRuralProjectById, getRuralProjects } from "../controllers/ruralProjects.js";

const router = express.Router();

router.get("/adminRuralProjects", getAdminRuralProjects);
router.get("/ruralProjects", getRuralProjects);
router.get("/getRuralProjectById", getRuralProjectById);

export default router; 