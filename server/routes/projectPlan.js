import express from "express";
import { createProjectPlanForRequest } from "../controllers/projectPlan.js";

const router = express.Router();

router.post("/createProjectPlan/:reqId", createProjectPlanForRequest);

export default router;
