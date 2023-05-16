import mongoose from "mongoose";

const CardPaymentSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        cardNumber: {
            type: String,
            required: true,
        },
        cardName: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        expDate: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Donation", "DownPayment"],
        }        
    }
);

const Payment = mongoose.model("CardPayment", CardPaymentSchema);
export default Payment;