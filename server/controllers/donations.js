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

export const getDonationById = async (req, res, next) => {
    try {
      const { donateId } = req.query;

      const donation = await Donation.findById(donateId);
      res.status(200).json(donation);
    } catch (err) {
      const error = new HttpError("Failed fetch data! Please try again", 500);
      return next(error);
    }
};

export const getDonationsByUserEmail = async (req, res, next) => {
    try {
      const { email } = req.query;
  
      const userDonations = await Donation.find({
        email: email,
      });
      console.log(userDonations);
  
      res.status(200).json(userDonations);
    } catch (err) {
      const error = new HttpError("Something went wrong! Please try again.", 404);
      return next(error);
    }
  };