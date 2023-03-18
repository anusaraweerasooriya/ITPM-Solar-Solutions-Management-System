import Donation from "../models/Donation.js";

/* CREATE */
export const createDonation = async (req, res) => {
    try {
        const {
            fullName,
            email,
            amount,
            contributingProject,
            date
        } = req.body;

        const newDonation = new Donation({
            fullName,
            email,
            amount,
            contributingProject,
            date
        });
        const savedDonation = await newDonation.save();
        res.status(201).json(savedDonation);

    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};