import CardPayment from "../models/CardPayment.js";

/* CREATE PAYMENT */
export const createPayment = async (req, res) => {
    try {
        const {
            user,
            cardNumber,
            cardName,
            amount,
            expDate,
            type,
        } = req.body;

        const newCardPayment = new CardPayment({
            user,
            cardNumber,
            cardName,
            amount,
            expDate,
            type,
        });
        const savedPayment = await newCardPayment.save();
        res.status(201).json(savedPayment);

    }catch (err) {
        res.status(409).json({ error: err.message });
    }
};