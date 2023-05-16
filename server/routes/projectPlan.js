import express from "express";
import {
  createProjectPlanForRequest,
  getServicePackById,
  getServicePackByRequest,
  getAdminProjectPlans,
  getProjectPlansByUser,
  getProjectPlanById,
} from "../controllers/projectPlan.js";

const router = express.Router();

router.post("/createProjectPlan/:reqId", createProjectPlanForRequest);
router.get("/getServicePackById/:servicePack", getServicePackById);
router.get("/getServicePackByRequest/:reqID", getServicePackByRequest);
router.get("/getAdminProjectPlans", getAdminProjectPlans);
router.get("/getProjectPlansByUser/:user", getProjectPlansByUser);
router.get("/getProjectPlanById/:planId", getProjectPlanById);

export default router;
