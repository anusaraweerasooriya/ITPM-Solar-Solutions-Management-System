import express from "express";
import {
  createProjectPlanForRequest,
  getServicePackById,
  getServicePackByRequest,
} from "../controllers/projectPlan.js";

const router = express.Router();

router.post("/createProjectPlan/:reqId", createProjectPlanForRequest);
router.get("/getServicePackById/:servicePack", getServicePackById);
router.get("/getServicePackByRequest/:reqID", getServicePackByRequest);

export default router;
