import express from "express";
import {
  createProjectPlanForRequest,
  getServicePackById,
  getServicePackByRequest,
  getAdminProjectPlans,
} from "../controllers/projectPlan.js";

const router = express.Router();

router.post("/createProjectPlan/:reqId", createProjectPlanForRequest);
router.get("/getServicePackById/:servicePack", getServicePackById);
router.get("/getServicePackByRequest/:reqID", getServicePackByRequest);
router.get("/getAdminProjectPlans", getAdminProjectPlans);

export default router;
