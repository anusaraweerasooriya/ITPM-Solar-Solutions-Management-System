import express from "express";
import { getAdminRuralProjects } from "../controllers/ruralProjects.js";
import { getRuralProjects } from "../controllers/ruralProjects.js";

const router = express.Router();

router.get("/adminRuralProjects", getAdminRuralProjects);
router.get("/ruralProjects", getRuralProjects);

export default router;