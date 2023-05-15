import express from "express";
import {
  createProjectPlanForRequest,
  getServicePackById,
} from "../controllers/projectPlan.js";

const router = express.Router();

router.post("/createProjectPlan/:reqId", createProjectPlanForRequest);
router.get("/getServicePackById/:servicePack", getServicePackById);

export default router;
