import express from "express";
import {
  createProjectPlanForRequest,
  getServicePackById,
  getServicePackByRequest,
  getAdminProjectPlans,
  getProjectPlansByUser,
} from "../controllers/projectPlan.js";

const router = express.Router();

router.post("/createProjectPlan/:reqId", createProjectPlanForRequest);
router.get("/getServicePackById/:servicePack", getServicePackById);
router.get("/getServicePackByRequest/:reqID", getServicePackByRequest);
router.get("/getAdminProjectPlans", getAdminProjectPlans);
router.get("/getProjectPlansByUser/:user", getProjectPlansByUser);

export default router;
