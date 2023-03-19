import express, { Router } from "express";

import {
  submitRequestPlan,
  getRequestPlans,
  getAdminRequestPlans,
  updatePendingRequest,
} from "../controllers/planRequests.js";

const router = express.Router();

router.post("/requestPlan", submitRequestPlan);
router.get("/getRequestPlans", getRequestPlans);
router.patch("/updateRequest/:rid", updatePendingRequest);
router.get("/adminGetPlanRequests", getAdminRequestPlans);

export default router;
