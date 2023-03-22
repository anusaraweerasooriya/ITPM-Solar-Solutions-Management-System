import express from "express";
import { createDonation } from "../controllers/donations.js";
import { getAdminDonations } from "../controllers/donations.js";

const router = express.Router();

router.post("/createDonation", createDonation);
router.get("/adminDonations", getAdminDonations);

export default router;