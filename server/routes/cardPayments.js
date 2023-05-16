import express from "express";
import { createPayment } from "../controllers/cardPayments.js";

const router = express.Router();

router.post("/createPayment", createPayment);

export default router;