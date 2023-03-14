import express from "express";
import { getRuralProjects } from "../controllers/ruralProjects.js";

const router = express.Router();

router.get("/ruralProjects", getRuralProjects);

export default router;