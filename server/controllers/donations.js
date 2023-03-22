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

/* ADMIN READ */
export const getAdminDonations = async (req, res) => {
    try {
        const { page=1, pageSize=20, sort=null, search="" } = req.query;
        
        //format sort
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };
            return sortFormatted;
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {}

        const donations = await Donation.find({
            $or: [
                { fullName: { $regex: new RegExp(search, "i") } },
                { email: { $regex: new RegExp(search, "i") } },
                { contributingProject: { $regex: new RegExp(search, "i") } },
            ]
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Donation.countDocuments({
            fullName: { $regex: search, $options: "i" }
        });

        res.status(200).json({
            donations,
            total
        });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};