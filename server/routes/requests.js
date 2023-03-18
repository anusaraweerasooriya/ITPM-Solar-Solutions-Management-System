import express, { Router } from "express";
import { userRegister, userLogin } from "../controllers/auth.js";
import { getMonthlyConsumption } from "../controllers/bill.js";
import { submitRequestPlan } from "../controllers/planRequests.js";

const router = express.Router();

router.post("/requestPlan", submitRequestPlan);

export default router;
