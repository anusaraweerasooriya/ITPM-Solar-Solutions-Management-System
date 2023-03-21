import express, { Router } from "express";

import {
  submitRequestPlan,
  getRequestPlans,
  getAdminRequestPlans,
  updatePendingRequest,
  getRequestsByUser,
} from "../controllers/planRequests.js";

const router = express.Router();

router.post("/requestPlan", submitRequestPlan);
router.get("/getRequestPlans", getRequestPlans);
router.get("/getRequestsByUser", getRequestsByUser);
router.patch("/updateRequest/:rid", updatePendingRequest);
router.get("/adminGetPlanRequests", getAdminRequestPlans);

export default router;
