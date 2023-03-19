import express, { Router } from "express";
import { userRegister, userLogin } from "../controllers/auth.js";
import { getMonthlyConsumption } from "../controllers/bill.js";
import {
  submitRequestPlan,
  getRequestPlans,
  getAdminRequestPlans,
} from "../controllers/planRequests.js";

const router = express.Router();

router.post("/requestPlan", submitRequestPlan);
router.get("/getRequestPlans", getRequestPlans);
router.get("/adminGetPlanRequests", getAdminRequestPlans);

export default router;
