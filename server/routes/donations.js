import express from "express";
import { createDonation, getAdminDonations, getDonationById } from "../controllers/donations.js";

const router = express.Router();

router.post("/createDonation", createDonation);
router.get("/adminDonations", getAdminDonations);
router.get("/getDonationById", getDonationById);

export default router;