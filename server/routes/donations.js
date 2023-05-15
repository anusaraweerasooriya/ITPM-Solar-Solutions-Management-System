import express from "express";
import { createDonation, getAdminDonations, getDonationById, getDonationsByUserEmail } from "../controllers/donations.js";

const router = express.Router();

router.post("/createDonation", createDonation);
router.get("/adminDonations", getAdminDonations);
router.get("/getDonationById", getDonationById);
router.get("/getDonationsByUserEmail", getDonationsByUserEmail);

export default router;