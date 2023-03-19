import express from "express";
import { getAdminDonations } from "../controllers/donations.js";

const router = express.Router();

router.get("/adminDonations", getAdminDonations);

export default router;