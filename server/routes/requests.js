import express, { Router } from "express";

import {
  submitRequestPlan,
  getRequestPlans,
  getAdminRequestPlans,
  updatePendingRequest,
  getRequestsByUser,
  getPendingRequestById,
  deletePendingRequest,
} from "../controllers/planRequests.js";

const router = express.Router();

router.post("/requestPlan", submitRequestPlan);
router.get("/getRequestPlans", getRequestPlans);
router.get("/getRequestsByUser", getRequestsByUser);
router.patch("/updateRequest/:rid", updatePendingRequest);
router.delete("/deletePendingRequest/:reqId", deletePendingRequest);
router.get("/getPendingRequestById", getPendingRequestById);
router.get("/adminGetPlanRequests", getAdminRequestPlans);

export default router;
