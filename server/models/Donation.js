import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        contributingProject: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        }        
    }
);

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;