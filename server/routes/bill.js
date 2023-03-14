import express, { Router } from "express";
import { userRegister, userLogin } from "../controllers/auth.js";
import { getMonthlyConsumption } from "../controllers/bill.js";

const router = express.Router();

router.post("/calculate", getMonthlyConsumption);

export default router;
